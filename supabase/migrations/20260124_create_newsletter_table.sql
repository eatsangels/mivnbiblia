-- Migration: Add Newsletter Subscriptions Table
-- Description: Table for managing newsletter email subscriptions
-- Created: 2026-01-24

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscriptions(is_active);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can subscribe to newsletter"
    ON newsletter_subscriptions
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Users can view their own subscription"
    ON newsletter_subscriptions
    FOR SELECT
    TO public
    USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own subscription"
    ON newsletter_subscriptions
    FOR UPDATE
    TO public
    USING (email = current_setting('request.jwt.claims', true)::json->>'email')
    WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Admin policies
CREATE POLICY "Admins can view all subscriptions"
    ON newsletter_subscriptions
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all subscriptions"
    ON newsletter_subscriptions
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );
