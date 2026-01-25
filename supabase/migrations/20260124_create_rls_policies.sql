-- Migration: RLS Policies for CMS Tables
-- Description: Row Level Security policies for content management
-- Created: 2026-01-24

-- Enable RLS on all tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonies ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PUBLIC READ POLICIES (Published content)
-- ============================================

-- Pages: Anyone can read published pages
CREATE POLICY "Public can view published pages"
ON pages FOR SELECT
USING (is_published = true);

-- Navigation: Anyone can read all navigation
CREATE POLICY "Public can view navigation menus"
ON navigation_menus FOR SELECT
USING (true);

CREATE POLICY "Public can view navigation items"
ON navigation_items FOR SELECT
USING (true);

-- Ministries: Anyone can read active ministries
CREATE POLICY "Public can view active ministries"
ON ministries FOR SELECT
USING (is_active = true);

-- Events: Anyone can read published events
CREATE POLICY "Public can view published events"
ON events FOR SELECT
USING (is_published = true);

-- Devotionals: Anyone can read published devotionals
CREATE POLICY "Public can view published devotionals"
ON devotionals FOR SELECT
USING (is_published = true);

-- Resource Categories: Anyone can read
CREATE POLICY "Public can view resource categories"
ON resource_categories FOR SELECT
USING (true);

-- Resources: Anyone can read published resources
CREATE POLICY "Public can view published resources"
ON resources FOR SELECT
USING (is_published = true);

-- Bulletins: Anyone can read published bulletins
CREATE POLICY "Public can view published bulletins"
ON bulletins FOR SELECT
USING (is_published = true);

-- Prayer Requests: Anyone can read approved, non-anonymous requests
CREATE POLICY "Public can view approved prayer requests"
ON prayer_requests FOR SELECT
USING (is_approved = true AND is_anonymous = false);

-- Donation Campaigns: Anyone can read active campaigns
CREATE POLICY "Public can view active donation campaigns"
ON donation_campaigns FOR SELECT
USING (is_active = true);

-- Site Settings: Anyone can read
CREATE POLICY "Public can view site settings"
ON site_settings FOR SELECT
USING (true);

-- Testimonies: Anyone can read approved testimonies
CREATE POLICY "Public can view approved testimonies"
ON testimonies FOR SELECT
USING (is_approved = true);

-- ============================================
-- USER WRITE POLICIES
-- ============================================

-- Event Registrations: Authenticated users can register
CREATE POLICY "Authenticated users can register for events"
ON event_registrations FOR INSERT
TO authenticated
WITH CHECK (true);

-- Event Registrations: Users can view their own registrations
CREATE POLICY "Users can view own event registrations"
ON event_registrations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Prayer Requests: Authenticated users can submit
CREATE POLICY "Authenticated users can submit prayer requests"
ON prayer_requests FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Prayer Requests: Users can view their own requests
CREATE POLICY "Users can view own prayer requests"
ON prayer_requests FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Prayer Requests: Users can update their own requests
CREATE POLICY "Users can update own prayer requests"
ON prayer_requests FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Donations: Users can view their own donations
CREATE POLICY "Users can view own donations"
ON donations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- ============================================
-- ADMIN POLICIES (Full Access)
-- ============================================
-- Note: These policies assume you have an 'is_admin' column in profiles table
-- If not, you'll need to create it or use a different admin check mechanism

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
        AND (
            -- Add your admin check here
            -- For now, we'll use email domain as example
            -- You should replace this with your actual admin logic
            email LIKE '%@mivn.org'
            OR email = 'admin@example.com'
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin can do everything on all tables
CREATE POLICY "Admins have full access to pages"
ON pages FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to navigation menus"
ON navigation_menus FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to navigation items"
ON navigation_items FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to ministries"
ON ministries FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to events"
ON events FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to event registrations"
ON event_registrations FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to devotionals"
ON devotionals FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to resource categories"
ON resource_categories FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to resources"
ON resources FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to bulletins"
ON bulletins FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to prayer requests"
ON prayer_requests FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to donation campaigns"
ON donation_campaigns FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to donations"
ON donations FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to site settings"
ON site_settings FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins have full access to testimonies"
ON testimonies FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());
