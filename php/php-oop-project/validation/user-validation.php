<?php
  /*
  Create a user validator class to handle validation
  constructor which takes in POST data from form
  check required "field to check" are present in the data
  create methods to validate individual fields
  return an error array once all checks are done
  */

  class UserValidator {
    private $data;
    private $errors = [];
    private static $fields = ['username', 'email'];

    public function __construct($postData) {
      $this->data = $postData;
    }

    public function validateForm() {
      foreach(self::$fields as $field) {
        if(array_key_exists($fields, $this->data)) {
          trigger_error("$field is no present in data");
          return;
        }
      }

      $this->validateUsername();
      $this->validateEmail();
      return $this->errors;
    }

    private function validateUsername() {
      $username = trim($this->data['username']);

      if(empty($username)) {
        $this->addError('username', 'username cannot be empty');
      } else {
        if(!preg_match('/^[a-zA-Z\d]{6, 12}$/', $username)) {
          $this->addError('username', 'username must be 6-12 chars & alphanumeric');
        }
      }
    }

    private function validateEmail() {
      $email = trim($this->data['email']);

      if(empty($email)) {
        $this->addError('email', 'email cannot be empty');
      } else {
        if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
          $this->addError('email', 'email must be a valid email');
        }
      }
    }

    private function addError($key, $message) {
      $this->errors[$key] = $message;
    }
  }
?>