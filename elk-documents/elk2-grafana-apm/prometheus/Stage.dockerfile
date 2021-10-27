Stage
- targets:
    - "chatbot-api-dev-01.3694rxdmgt.us-east-1.elasticbeanstalk.com"
    - "utilitygo-api-dev.us-east-1.elasticbeanstalk.com"
    - "utilitygo-api-stage.us-east-1.elasticbeanstalk.com"
    - "backoffice-api-stage-1.us-east-1.elasticbeanstalk.com"
    - "chatbot-api-dev.us-east-1.elasticbeanstalk.com"
    - "chatbot-api-stage-02.us-east-1.elasticbeanstalk.com"
    - "chatbot-api-stage-workers.us-east-1.elasticbeanstalk.com"
    - "crewsourcing-api-dev.us-east-1.elasticbeanstalk.com"
    - "crewsourcing-api-stage.us-east-1.elasticbeanstalk.com"
    - "iot-api-stage.us-east-1.elasticbeanstalk.com"
    - "meter-reading-api-dev-1.us-east-1.elasticbeanstalk.com"
    - "meter-reading-api-stage-1.us-east-1.elasticbeanstalk.com"
    - "notifications-api-stage.us-east-1.elasticbeanstalk.com"
    - "workflows-api-dev.eba-md32um6m.us-east-1.elasticbeanstalk.com"




backoffice
awseb-e-a-AWSEBLoa-V4PV54WNHLN5-292107316.us-east-1.elb.amazonaws.com.


targets:
   - "http://backoffice-api-1.us-east-1.elasticbeanstalk.com" validar
   - "http://chatbot-api.us-east-1.elasticbeanstalk.com/" validar
   - "http://chatbot-api-workers.us-east-1.elasticbeanstalk.com/" validar
   - "http://crewsourcing-api.us-east-1.elasticbeanstalk.com/" validar
   - "http://iot-api-1.us-east-1.elasticbeanstalk.com/" validar
   - "http://iot-api-workers.us-east-1.elasticbeanstalk.com/" validar
   - "http://meter-reading-api-e01.eba-v6bgyumg.us-east-1.elasticbeanstalk.com/" validar
   - "http://notifications-api.us-east-1.elasticbeanstalk.com/"
   - "http://utilitygo-api-e01.us-east-1.elasticbeanstalk.com/" validar
   - "http://utilitygo-api-e02.us-east-1.elasticbeanstalk.com/" validar
   - "http://utilitygo-api-enotif.us-east-1.elasticbeanstalk.com/" validar


Prod:

   - "http://backoffice-api-1.us-east-1.elasticbeanstalk.com"
   - "https://chatbot-api.widergy.com/api/v1/status"
   - "https://crewsourcing-api.widergy.com/health_check/all"
   - "https://smart-reader-platform.widergy.com/health_check/all"
   - "https://iot-api.widergy.com/"
   - "https://utilitygo-api.widergy.com/health_check/all"
   - "https://notifications-api.widergy.com"
   - "https://utilitygo-api-2.widergy.com/health_check/all"
   


   stage
   - targets:
        - "http://backoffice-api-stage-1.us-east-1.elasticbeanstalk.com/"
      labels:
        name: "backoffice-stage"
   - targets:
        - "https://utilitygo-api-stage.widergydev.com/health_check/all"
      labels:
        name: "utilitygo-stage"
   - targets:
        - "https://utilitygo-api-dev.widergydev.com/health_check/all"
      labels:
        name: "utilitygo-dev" 
   - targets:
        - "iot-api-stage.us-east-1.elasticbeanstalk.com" 
      labels:
        name: "iot-stage" 
   - targets:
        - "https://chatbot-api-dev.widergydev.com/api/v1/status"
      labels:
        name: "chatbot-dev" 
   - targets:
        - "https://chatbot-api-stage.widergydev.com/api/v1/status"
      labels:
        name: "chatbot-stage" 
   - targets: 
        - "https://crewsourcing-api-dev.widergydev.com/health_check/all"
      labels:
        name: "crewsourcing-dev"        
   - targets: 
        - "https://crewsourcing-api-stage.widergydev.com/health_check/all"
      labels:
        name: "crewsourcing-stage"        
   - targets: 
        - "https://mrp-api-dev.widergydev.com/health_check/all"
      labels:
        name: "mrp-dev"
   - targets: 
        - "https://mrp-api-stage.widergydev.com/health_check/all"
      labels:
        name: "mrp-stage"            



