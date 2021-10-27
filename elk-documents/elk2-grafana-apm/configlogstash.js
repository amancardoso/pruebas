if "production.log" in [log][file][path] or "staging.log" in [log][file][path] {
    # Matching rails server logs
    grok {
      match => { "message" => "[DFEWI], \[%{TIMESTAMP_ISO8601:timestamp} #%{POSINT:pid}\] *%{RUBY_LOGLEVEL:loglevel} -- : \[%{UUID:event_id}] %{GREEDYDATA:message}" }
      overwrite => ["message"]
      add_field => { "type" => "rails" }
    }
  }
  else if "sidekiq.log" in [log][file][path] {
    # Matching sidekiq logs
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{POSINT:pid} (?<thread_id>TID-[A-za-z0-9]{9}) (?<job_type>\w*(::)?\w+) (?<event_id>JID-[A-za-z0-9]{24}) *%{RUBY_LOGLEVEL:loglevel}: (?<message>(.|\r|\n)*)" }
      overwrite => ["message"]
      add_field => { "type" => "sidekiq" }
    }
  }
  