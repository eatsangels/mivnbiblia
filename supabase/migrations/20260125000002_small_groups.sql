-- Create small_groups table
CREATE TABLE IF NOT EXISTS small_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    leader TEXT NOT NULL,
    description TEXT,
    members_count INTEGER DEFAULT 0,
    image_url TEXT,
    leader_image_url TEXT,
    schedule TEXT,
    location TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default data from current website
INSERT INTO small_groups (name, category, leader, description, members_count, image_url, leader_image_url)
VALUES
    (
        'Generación Diferente',
        'Jóvenes',
        'Daniel & Sara',
        'Un espacio para jóvenes que buscan vivir su fe de manera radical y transformar su entorno.',
        42,
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCCNpXgnxQfZmXRN-w3dy5wYKwJTSwYpQnK7JUjyKCcW10BhbC71E9zAYvQTvHrQb9ALTKYZP0AaHvUyWSFLRcMjz5KeymsXAyPblUzxjO81DZEN8jrU9UW3vGiStkLENkfOHZVzHe_mZC-rblH59ZqMuLwovq34ckBTeIY6w69VSS8HHzLQBTgjtfq9UhOyH-FQcCuLXd3wLKP8w0shI0KMzDf8G8lskjPdMKfBqwwRSSCSretZKieW0LVg_s7tFlQI17MpkG2-D0',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDR7iCvWXZW4a1HD4EgTJkOGf0IMdkEbbe7mOosOOfRHXDUEv_vrvduZJ21OLaM-mHeS1bOmVrK2pUlpAVkydWszBAjPD9yTP7XO6z8bUpcSXR_lhltvef2m_vwFXNsxfOnQB881A2Rngdufyd5r9FMdKtrQ86QeSX0EotBXtjqiHTDIuO2FjFa8DG_G5LoVMcVtUapPw3KRp0FVrVYSDXlXrJkj1phBuEhPFG3kHSnF8qdpN-lOabRg0PHfdAXa_G-9WtPhMaPXc8'
    ),
    (
        'Matrimonios Firmes',
        'Parejas',
        'Pastores Gómez',
        'Edificando familias sólidas sobre la roca que es Cristo. Charlas, cenas y oración.',
        28,
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCsZyVlHkGKkZEBAj_cFkMttR3q40_Ep-GlEUzsIJwhcw93wIBfrBQ0gpmSPai62XAaGvZHihXwfTrdqyKZ-4SUXqGQlhHmS0_5L3yd3kmLL7bbDYDHkAKLvfhZ7EQ-zvsycXDoVINsc2Wphsf8xONHFvKhpktLdFLztVEVeHqq9B2tfH2mbAaDtvNMiJ3W2_GO5EAqYwyToBf3U_ML05auYT9T1dSVR3ChxpyF_--1vpedFhkJBvBQWjVNt_JiEhiLp68hbM6EmYY',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAFz5FugS3R9vYpK03oGD5yzPG5741GaICRXIk_Xl7c0Fl3bkcqU1Ykc8XIsFgI6sNKQSmy_iMbzGOIXMZsBxUOtafVzIQ89DCSwnEFXyPgIcuZCNIV44MEQ4rvZiOm9KzHg4zhtI4v1rx4WBWzx-AXAMREAViHq4Nyr9K4-faV0N7Qdtv7lpnl62_ylnElDJPioV_0XEtInl2pCw5-_4-dZ4zd6XrX8f0SIqVdiDsrC86JIyx5YQZDngkOrfKepkYUTwBCuXHPCgM'
    ),
    (
        'Corazón de Adorador',
        'Alabanza',
        'Marcos Villa',
        'Más que música, buscamos la presencia de Dios en cada nota y cada palabra.',
        15,
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDl1JRUc2a9aoqdKiwejpZEb2XwSXCgAOS4fzAua-Ljm5bzde9jmk2SMdf3WDxW-fm-h0cwuSdDzEQYWWcNatjKfJSXXY6dGqix2gjeaXOsxkc-zOwCmV95P1RBbhLgnhUqHogbo9mr550atCPWdrDLBAnYPS0UzPSv5GqclLjRwUD-20mc51FDrpwMS5KZICbFraVtexmRpvGoNjTSraxS2ij9_Yf5A-WwPnxRLL-Vu5JhEiXWFmCpMQzsrhLD9fjKmI1IA02pUro',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDIyRwxUBdAiw2q8wChBYbxfnPqmqC-hVKCTekrcTnHY1BvAJA8sjAztPGW61zdxw7snwIpVuj1D24aY1s0NtL2zaHAfYOI89hzs2_b8W75ydoGMIJObZ5yGFp9s-h0NIYrNW2wEjLvStvnvsZWHyhpulDltFaQG8IdZQQJWOJzWF1eDSWPbhxTcV-UX5AfOJJnVz3yTzmVOtDWi_ySkLvT9kGM2maKThzTov9BqN80E2exL3IMeLtWYo2RNuiUVAEpFg1ctg1kNu0'
    ),
    (
        'Guerreros de Oración',
        'Oración',
        'Hna. Martha',
        'Intercediendo por nuestra comunidad, nación y las peticiones de cada hermano.',
        50,
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_WyDVeL2fSGuzMLWFLKuw5MjW0Xce3Dw7oGXdeO-I2f4G-AhvSiTNK9bswiNKmzSOPH0iJYxnjVuA9ftDJPFD0bu_rMHFKdY2lQ7aa-Z5kBBIUlECdjVKqwpnaeZFHYjxVzX5BQWH-oS6WUS-28yehr9DFWH-uz3CyS-9_mniwtgwYinhGdtruVYyIZ_lk0wkKA-oyc4PXScnoPx-sAF9PMBSXh3-EJL_Ss_ECBaxbQOkZ98gudm8JyDmyezPKd2vw2rLb0aMcz8',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA61KfSY1e6npwROVYLTmlrZzu8Y95YkgFeu1D7E21bKOT3gdO6gJKH7sqgzY1-HF-yca5WxqWBH1RC01w87NkLpfivUfPE4aGT5y1tqpWQfoNLouxwrg4WR9OyeWdBc867I4dikeCP2-NrXL1QP4VeTVyIluYRzgGu5imo261KXzgXDhyMXi5WB0A6h-UKQqfObE4R9OwvvanLn4PMg40QMAH7tXx13CH4Tq-zw_9qK6XcQkyN98diNMH3y1aTDvKceC32jWUje2w'
    )
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE small_groups ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Allow public read access to small_groups" ON small_groups;
CREATE POLICY "Allow public read access to small_groups"
    ON small_groups FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Allow admin write access to small_groups" ON small_groups;
CREATE POLICY "Allow admin write access to small_groups"
    ON small_groups FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Add trigger for updated_at
CREATE TRIGGER update_small_groups_updated_at BEFORE UPDATE ON small_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
