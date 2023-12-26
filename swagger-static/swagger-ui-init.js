
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/auth/registration": {
        "post": {
          "operationId": "AuthController_registration",
          "summary": "Registration",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegistrationDto"
                }
              }
            }
          },
          "responses": {
            "204": {
              "description": ""
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "errorsMessages": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "message": {
                              "type": "string"
                            },
                            "field": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/login": {
        "post": {
          "operationId": "AuthController_loginUser",
          "summary": "User authorization",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginForSwaggerType"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/auth/me": {
        "get": {
          "operationId": "AuthController_getMe",
          "summary": "Returns user data",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserEntity"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/users": {
        "get": {
          "operationId": "UsersController_getAllUsers",
          "summary": "Get all users",
          "parameters": [
            {
              "name": "pageSize",
              "required": false,
              "in": "query",
              "description": "Number of elements to return",
              "schema": {
                "default": 9,
                "type": "integer"
              }
            },
            {
              "name": "sortDirection",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string",
                "default": "desc",
                "enum": [
                  "asc",
                  "desc"
                ]
              }
            },
            {
              "name": "sortBy",
              "required": false,
              "in": "query",
              "description": "What field to sort by",
              "schema": {
                "default": "createdAt"
              }
            },
            {
              "name": "pageNumber",
              "required": false,
              "in": "query",
              "description": "Page number to return",
              "schema": {
                "default": 1,
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/QueryUserViewModel"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/users/{userId}": {
        "put": {
          "operationId": "UsersController_updateUser",
          "summary": "Update current user",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "description": "User id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UserViewModel"
                  }
                }
              }
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Users"
          ]
        },
        "delete": {
          "operationId": "UsersController_deleteUser",
          "summary": "Delete user",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "description": "User id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "User deleted"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not Found"
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/profile/{userId}": {
        "post": {
          "operationId": "ProfilesControllers_createOrUpdateProfile",
          "summary": "Create or update profile",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "description": "User id",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProfileDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ProfileEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "Profile"
          ]
        }
      }
    },
    "info": {
      "title": "Social Network",
      "description": "The social network API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "RegistrationDto": {
          "type": "object",
          "properties": {
            "fullName": {
              "type": "string",
              "minimum": 3,
              "maximum": 20
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string",
              "minimum": 3,
              "maximum": 20
            }
          },
          "required": [
            "fullName",
            "email",
            "password"
          ]
        },
        "LoginDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Email"
            },
            "password": {
              "type": "string",
              "description": "Password"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "LoginForSwaggerType": {
          "type": "object",
          "properties": {
            "accessToken": {
              "type": "string",
              "description": "Access token for authentication."
            }
          },
          "required": [
            "accessToken"
          ]
        },
        "UserEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "User id"
            },
            "fullName": {
              "type": "string",
              "description": "Full name"
            },
            "email": {
              "type": "string",
              "description": "Email"
            },
            "createdAt": {
              "type": "string",
              "description": "Created date"
            }
          },
          "required": [
            "id",
            "fullName",
            "email",
            "createdAt"
          ]
        },
        "Profile": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Profile id"
            },
            "userId": {
              "type": "number",
              "description": "User id"
            },
            "lookingForAJob": {
              "type": "boolean"
            },
            "lookingForAJobDescription": {
              "type": "string"
            },
            "avatar": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "status": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "userId",
            "lookingForAJob",
            "lookingForAJobDescription",
            "avatar",
            "country",
            "city",
            "status"
          ]
        },
        "UserTypeForQueryRepo": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "User id"
            },
            "fullName": {
              "type": "string",
              "description": "Full name"
            },
            "email": {
              "type": "string",
              "description": "Email"
            },
            "createdAt": {
              "type": "string",
              "description": "Created date"
            },
            "follow": {
              "type": "boolean",
              "description": "Follow or Unfollow"
            },
            "profile": {
              "description": "User profile",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Profile"
                }
              ]
            }
          },
          "required": [
            "id",
            "fullName",
            "email",
            "createdAt",
            "follow",
            "profile"
          ]
        },
        "QueryUserViewModel": {
          "type": "object",
          "properties": {
            "pagesCount": {
              "type": "number",
              "description": "Number of items sorted"
            },
            "page": {
              "type": "number",
              "description": "Number of pages"
            },
            "pageSize": {
              "type": "number",
              "description": "Page Size"
            },
            "totalCount": {
              "type": "number",
              "description": "Total items"
            },
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/UserTypeForQueryRepo"
              }
            }
          },
          "required": [
            "pagesCount",
            "page",
            "pageSize",
            "totalCount",
            "items"
          ]
        },
        "UpdateUserDto": {
          "type": "object",
          "properties": {
            "fullName": {
              "type": "string",
              "description": "Full name"
            },
            "email": {
              "type": "string",
              "description": "Email"
            },
            "password": {
              "type": "string",
              "description": "Password"
            },
            "avatar": {
              "type": "string",
              "description": "Path"
            },
            "follow": {
              "type": "boolean"
            },
            "status": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "city": {
              "type": "string"
            }
          },
          "required": [
            "fullName",
            "email",
            "password",
            "avatar",
            "follow",
            "status",
            "country",
            "city"
          ]
        },
        "UserViewModel": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "User id"
            },
            "fullName": {
              "type": "string",
              "description": "Full name"
            },
            "email": {
              "type": "string",
              "description": "Email"
            },
            "createdAt": {
              "type": "string",
              "description": "Created date"
            },
            "follow": {
              "type": "boolean",
              "description": "Follow or Unfollow"
            }
          },
          "required": [
            "id",
            "fullName",
            "email",
            "createdAt",
            "follow"
          ]
        },
        "ProfileDto": {
          "type": "object",
          "properties": {
            "lookingForAJob": {
              "type": "boolean"
            },
            "lookingForAJobDescription": {
              "type": "string"
            },
            "avatar": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "status": {
              "type": "string"
            }
          },
          "required": [
            "lookingForAJob",
            "lookingForAJobDescription",
            "avatar",
            "country",
            "city",
            "status"
          ]
        },
        "ProfileEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Profile"
            },
            "userId": {
              "type": "number",
              "description": "User id"
            },
            "lookingForAJob": {
              "type": "boolean"
            },
            "lookingForAJobDescription": {
              "type": "string"
            },
            "avatar": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "status": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "userId",
            "lookingForAJob",
            "lookingForAJobDescription",
            "avatar",
            "country",
            "city",
            "status"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
