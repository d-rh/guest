- Make the UI aware that a user is currently authenticated
  - Cookie (sessId and username) functioning - authController.verifyAuth()
    implemented to check cookies for an ID in Mongo DB session collection.
    This function is buggy:
    localhost:3005/feed without sessId throws this error:
    Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 

- Allow a currently authenticated user to log themselves out

- Use bootstrap styling to make shit pretty

- Show list of other users that have logged in

- Post to message board
- Support annoymous messages
- Support messages for users that are logged in.
  - Messages for user that are logged in should show their information
