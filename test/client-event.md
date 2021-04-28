single input + bundle

use case
- tracing
    - performance
    - exceptions
    - messages
- analytics
    - page load
    - action
    - ...
- security
    - profile change
    - trusteer
    - tampering
- sync SDA


client:
- tracing: 
    - FETracing.setLevel(level)
    - FETracing.traceError(ErrorObj)
    - FETracing.traceMessage(String)
- analytics
    - FEAnalytics.pageLoad();
    - FEAnalytics.actionEvent();

input:
- tracing:
    - event_id: Required. Hexadecimal string representing a uuid4 value
    - timestamp: Indicates when the event
    - platform: [web, ios, android] - A string representing the platform
    - level: [fatal, error, warning, info, debug] - Optional. The record severity.
    - logger: "my.logger.name" - Optional. The name of the logger which created the record.
    - transaction: "/users/<username>/" - Optional. The name of the transaction which caused this exception.
    - server_name: "foo.example.com" - Optional. Identifies the host from which the event was recorded.
    - release: "my-project-name@1.0.0" - Optional. The release version of the application.
    - dist: "14G60" - Optional. The distribution of the application.
    - tags: { "ios_version": "4.0", "context": "production" } - Optional. A map or list of tags for this event.
    - metadata: {} - Optional. An arbitrary mapping of additional metadata to store with the event.
    - trace_data: [{}] - A list of errors in capturing or handling this event.
        - Exception: {
            - trace_type: "exception"
            - type: "value_error" - The type of exception
            - value: The value of the exception (a string).
            - stacktrace: TBD
        }
        - Message: {
            - trace_type: "message"
            - message: The raw message string
        }
- analytics - pageLoad:
    - $ref: '#/parameters/origin'
    - $ref: '#/parameters/User-Agent'
    - $ref: '#/parameters/uber-trace-id'
    - $ref: '#/parameters/X-ING-Session-ID'
    - $ref: '#/parameters/X-ING-AccessToken'
    - $ref: '#/parameters/X-ING-PROFILE-ID'
    marketingPref: string
    clientIdentifier: string
    gclid: string
    offerCode: string
    propCode: string
    mc: string
    campaignId: string
    experiments: object
    additionalProperties: string

- analytics - event:
    - $ref: '#/parameters/origin'
    - $ref: '#/parameters/User-Agent'
    - $ref: '#/parameters/uber-trace-id'
    - $ref: '#/parameters/X-ING-Session-ID'
    - $ref: '#/parameters/X-ING-AccessToken'
    - $ref: '#/parameters/X-ING-PROFILE-ID'
    eventName: string

Use case - Event Publish:
- Input: 
    - common wrapper - clientId + activityType
        - activityType: tracing, analytics, security, ...
        - activityEvent: 
    - declarative body
    - customer if present?
- Mapping to event schema:
    - map 1 to 1 per activityType - no transformations
- Data segregation:
    - based on clientId + activityType
- Data analysis
    - Analytics ... data lake
    - Tracing ... ?
    - Security ... fraud engine, data lake
- onboarding
    - based on clientId and activityType - 
    

Use Case - Event Push:


Use Case - Event Loop:
    1. Consumer - post client event
    2. Client Event API - publish event (event loop - 1)
    3. SDA - consumes (event loop - 1) - publish (event loop - 2)
    4. Client Event API . consumes (event loop - 2) AND (execute REST callback OR publish event 3)
    5. Consumer - consumes Client Event (event loop - 3) OR RESt callback 



INPUT POST
interface
 - clientid
 - eventType
 - version
body
 - 



 