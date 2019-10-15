json.extract! user, :id, :name, :email, :gender, :phone, :exp1, :exp2, :exp3, :education, :extras, :description, :created_at, :updated_at
json.url user_url(user, format: :json)
