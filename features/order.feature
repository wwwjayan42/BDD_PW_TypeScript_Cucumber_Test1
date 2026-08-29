Feature: This feature is to test order functionalities

@Smoke @Order
Scenario Outline: This scenario is to test multiple logins
    Given Navigate to product page and login
    When search the "<product>" and add to cart
    And provide valid "<address>" for shipping then submit
    Then validate if the order placement is successful
Examples:
    |product|address|
    |iphone|chennai|
    |samsung|mumbai|