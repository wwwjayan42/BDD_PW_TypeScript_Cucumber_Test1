@Regression
Feature: Login Feature
    This feature is to test login functionalities

Background:
    Given navigate to application website

@Smoke
Scenario: This scenario is to test valid login
    # Given navigate to application website
    When provide valid username and password then hit login
    Then validate if the user login is successful

Scenario: This scenario is to test invalid login
    # Given navigate to application website
    When provide invalid username and password then hit login
    Then validate if the user login is unsuccessful

@Reset
Scenario: This scenario is to test forgot password function
    # Given navigate to application website
    And click on forgot password link
    When provide new password and reconfirm password
    And generate otp and submit then hit change password
    Then validate if the password change is successful
    And try relogin with new credential

@Smoke
Scenario Outline: This scenario is to test multiple logins
    When provide valid "<username>" and "<password>" then hit login
    Then validate if the user login is successful
Examples:
    |username|password|
    |standard_user|secret_sauce|
    |problem_user|secret_sauce|
    |error_user|secret_sauce|