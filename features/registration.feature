Feature: This feature is to test registration functionalities

@Registration
Scenario: This scenario is to validate student registration
    Given navigate to the demoqa registration page
    When provide valid student details and submit
    |Username|Password|FullName|email|Terms|
    |Azharudeen|Test@1234|Azharudeen Jaferali|azharudeen@gmail.com|Yes|
    |Ram|Hello@1234|Ram Kumar|ramkumar@gmail.com|Yes|
    Then validate if the registration is successful