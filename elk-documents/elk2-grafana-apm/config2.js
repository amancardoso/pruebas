
input {
  beats {
    client_inactivity_timeout => 36000
    port => 5044
  }
}
filter {
 if "production.log" in [log][file][path] or "staging.log" in [log][file][path] {
    # Matching rails server logs
    grok {
      match => { "message" => "[DFEWI], \[%{TIMESTAMP_ISO8601:timestamp} #%{POSINT:[process][pid]:int}\] *%{RUBY_LOGLEVEL:[log][level]} -- +%{DATA:[process][name]}: %{GREEDYDATA:message}" }
      overwrite => ["message"]
      add_field => { "type" => "rails" }
    }
  }
  else if "sidekiq.log" in [log][file][path] {
    # Matching sidekiq logs
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:time} %{POSINT:[process][pid]:int} (?<thread_id>TID-[A-za-z0-9]{9}) (?<job_type>\w*(::)?\w+) (?<event_id>JID-[A-za-z0-9]{24}) *%{RUBY_LOGLEVEL:[log][level]}: (?<message>(.|\r|\n)*)" }
      overwrite => ["message"]
      add_field => { "type" => "sidekiq" }
    }
  }
  aggregate {
    # The id for which we will be doing the aggregation. Aggregate or add unordered correlated events.
    task_id => "%{event_id}"
    code => "
      # Add messages from the events with the same event id. We have to add actual new lines to map them in the resulting message.
      map['message'] ||= ''
      map['message'] << event.get('message') + '
'

      # Add log level
      map['loglevel'] ||= event.get('loglevel')
      if (event.get('loglevel') == 'ERROR')
        map['loglevel'] = event.get('loglevel')
      end

      # Add attributes for the correct mapping of the index. Don't delete this.
      map['fields.appname'] ||= event.get('[fields][appname]')
      map['fields.environment'] ||= event.get('[fields][environment]')

      # Add attributes from the previous event
      map['fields.appcomponent'] ||= event.get('[fields][appcomponent]')

      # Alias to agent.hostname
      map['beat.hostname'] ||= event.get('[beat][hostname]')
      # Alias to host.name
      map['beat.name'] ||= event.get('[beat][name]')
      # Alias to agent.version
      map['beat.version'] ||= event.get('[beat][version]')

      map['host.name'] ||= event.get('[host][name]')
      map['log.file.path'] ||= event.get('[log][file][path]')
      map['offset'] ||= event.get('offset')

      # Map job type for sidekiq events
      if event.get('type') == 'sidekiq'
        map['job_type'] ||= event.get('job_type')
      end

      # Drop initial event
      event.cancel()
    "

    # The event will be pushed when the timeout ocurrs. Correlate by task id to the timeout.
    push_map_as_event_on_timeout => true
    timeout_task_id_field => 'event_id'
    timeout => 10
  }

  # Here we map the fields from the new event. This is needed to make the attributes nested.
  mutate {
    rename => {
      "fields.appname" => "[fields][appname]"
      "fields.environment" => "[fields][environment]"
      "fields.appcomponent" => "[fields][appcomponent]"
      "beat.hostname" => "[beat][hostname]"
      "beat.name" => "[beat][name]"
      "beat.version" => "[beat][version]"
      "host.name" => "[host][name]"
      "log.file.path" => "[log][file][path]"
    }
  }
}
output {
  stdout { codec => rubydebug }
  elasticsearch {
      hosts => "150.1.117.61:9200"
      index => "%{[fields][appname]}-%{[fields][environment]}-%{+MM.YYYY}"
      user => "elastic"
      password => "widergy2021"
  }
}

