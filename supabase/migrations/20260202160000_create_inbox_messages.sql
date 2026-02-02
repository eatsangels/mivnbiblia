-- Create inbox_messages table
CREATE TABLE IF NOT EXISTS public.inbox_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT,
    body TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    parent_id UUID REFERENCES public.inbox_messages(id) ON DELETE SET NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    sender_deleted BOOLEAN DEFAULT FALSE,
    recipient_deleted BOOLEAN DEFAULT FALSE,
    sender_starred BOOLEAN DEFAULT FALSE,
    recipient_starred BOOLEAN DEFAULT FALSE,
    sender_purged BOOLEAN DEFAULT FALSE,
    recipient_purged BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE public.inbox_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view messages they sent or received (and not purged)
CREATE POLICY "Users can view their messages"
ON public.inbox_messages
FOR SELECT
TO authenticated
USING (
    (auth.uid() = sender_id AND sender_purged = FALSE) OR
    (auth.uid() = recipient_id AND recipient_purged = FALSE)
);

-- Policy: Users can insert messages as sender
CREATE POLICY "Users can send messages"
ON public.inbox_messages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = sender_id);

-- Policy: Senders can update their own sender_* columns
CREATE POLICY "Senders can update their fields"
ON public.inbox_messages
FOR UPDATE
TO authenticated
USING (auth.uid() = sender_id)
WITH CHECK (auth.uid() = sender_id);

-- Policy: Recipients can update their own recipient_* columns  
CREATE POLICY "Recipients can update their fields"
ON public.inbox_messages
FOR UPDATE
TO authenticated
USING (auth.uid() = recipient_id)
WITH CHECK (auth.uid() = recipient_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_inbox_messages_sender_id ON public.inbox_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_inbox_messages_recipient_id ON public.inbox_messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_inbox_messages_created_at ON public.inbox_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inbox_messages_parent_id ON public.inbox_messages(parent_id);
CREATE INDEX IF NOT EXISTS idx_inbox_messages_sender_deleted ON public.inbox_messages(sender_id, sender_deleted, sender_purged);
CREATE INDEX IF NOT EXISTS idx_inbox_messages_recipient_deleted ON public.inbox_messages(recipient_id, recipient_deleted, recipient_purged);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_inbox_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inbox_messages_updated_at
BEFORE UPDATE ON public.inbox_messages
FOR EACH ROW
EXECUTE FUNCTION update_inbox_messages_updated_at();
