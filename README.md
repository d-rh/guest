- Encrypt the passwords

  - hashing and matching implemented with bcrypt!

- Make the UI aware that a user is currently authenticated

  - Need to create a session with Session ID, userId, name
  - any page besides "/" and "/login" should check if there's a session
    - if there's not a session, redirect them to "/login"
      - hint: use middleware

- Allow a currently authenticated user to log themselves out

- Use bootstrap styling to make shit pretty

- Show list of other users that have logged in

- Post to message board
- Support annoymous messages
- Support messages for users that are logged in.
  - Messages for user that are logged in should show their information
