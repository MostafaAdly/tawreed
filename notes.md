# User
    belongs_to Company

    username: string
    credentials: { hashed_password: string, OTP }

# Company
    has_many users

    name: string
    