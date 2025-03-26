-- Users table
CREATE TABLE UserAccount (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) CHECK (role IN ('customer', 'admin')) DEFAULT 'customer' -- Defines user type
);

-- Candle containers table
CREATE TABLE Container (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    material VARCHAR(50) NOT NULL,
    description TEXT
);

-- Fragrances table
CREATE TABLE Fragrance (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    associated_color VARCHAR(20)
);

-- Mood table
CREATE TABLE Mood (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Relationship between moods and fragrances (for AI recommendations)
CREATE TABLE Mood_Fragrance (
    mood_id INT REFERENCES Mood(id),
    fragrance_id INT REFERENCES Fragrance(id),
    PRIMARY KEY (mood_id, fragrance_id)
);

-- Personalized candles table
CREATE TABLE Candle (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES UserAccount(id) ON DELETE CASCADE,
    container_id INT REFERENCES Container(id),
    fragrance_id INT REFERENCES Fragrance(id),
    message TEXT,
    image_url TEXT, -- URL of the image in Firebase Storage
    video_url TEXT,  -- URL of the video in Firebase Storage
    audio_url TEXT,  -- URL of the audio in Firebase Storage
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription table
CREATE TABLE Subscription (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES UserAccount(id) ON DELETE CASCADE,
    preferred_fragrance INT REFERENCES Fragrance(id),
    frequency VARCHAR(20) CHECK (frequency IN ('monthly', 'bimonthly', 'quarterly')),
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ensure a user has only one active subscription
ALTER TABLE Subscription ADD CONSTRAINT unique_subscription UNIQUE (user_id);

-- Discount table (created before OrderTable to avoid foreign key issues)
CREATE TABLE Discount (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    percentage DECIMAL(5,2) CHECK (percentage BETWEEN 0 AND 100),
    expiration_date TIMESTAMP
);

-- Orders table
CREATE TABLE OrderTable (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES UserAccount(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'canceled')),
    total DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    discount_id INT REFERENCES Discount(id)
);

-- Payments table
CREATE TABLE Payment (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES OrderTable(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) CHECK (payment_method IN ('card', 'transfer', 'paypal')),
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'approved', 'rejected')),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order status change history
CREATE TABLE Order_History (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES OrderTable(id) ON DELETE CASCADE,
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relationship between orders and personalized candles
CREATE TABLE Order_Candle (
    order_id INT REFERENCES OrderTable(id) ON DELETE CASCADE,
    candle_id INT REFERENCES Candle(id) ON DELETE CASCADE,
    quantity INT CHECK (quantity > 0),
    PRIMARY KEY (order_id, candle_id)
);

-- Complementary products table (flowers, chocolates, etc.)
CREATE TABLE Complement (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

-- Relationship between orders and complementary products
CREATE TABLE Order_Complement (
    order_id INT REFERENCES OrderTable(id) ON DELETE CASCADE,
    complement_id INT REFERENCES Complement(id) ON DELETE CASCADE,
    quantity INT CHECK (quantity > 0),
    PRIMARY KEY (order_id, complement_id)
);