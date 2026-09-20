source "https://rubygems.org"

ruby "3.3.10"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.3", ">= 7.1.3.2"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Gem para PostgreSQL
gem "pg"

# CORS para a API
gem "rack-cors"

# Use Active Model has_secure_password
gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mswin mswin64 mingw x64_mingw jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[mri mswin mswin64 mingw x64_mingw]
  # Testes (RSpec + factories)
  gem "factory_bot_rails", "~> 6.4"
  gem "rspec-rails", "~> 6.1"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
  # Linters (backend)
  gem "rubocop", "~> 1.60", require: false
  gem "rubocop-rails", "~> 2.24", require: false
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
end
