# User - STI
  has_many: posts

  - type: string
  - username: string
  - email: string
  - hashed_password: string
  - phone: string
  - company:jsonb -> { size: string, industry: string, address: string, notes: string }
  - metadata: jsonb
# `# Client, Supplier: children of User`

# Post - STI
  belongs_to: client
  belongs_to: supplier

  - id: integer (auto_increment)
  - name: string
  - description: string
  - industry: string
  - quantity: integer
  - images: string[]
  - metadata: jsonb

# Offer - Child of Post
  belongs_to: post
  has_one: offer_response

  - status: string

# OfferResponse - Child of Post
  belongs_to: offer

  - price: integer
  - delivery_date: date
  - comment: string

# Order extends Post
  has_one: offer

  - status: string
  - metadata: jsonb

# `# Offer, OfferResponse: children of Post`
# `# Order: extends Post`