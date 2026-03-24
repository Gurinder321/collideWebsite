
export default async function handler(req, res) {
  // Load the Access Token from the environment
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(500).json({ error: 'Missing Instagram access token.' });
  }

  try {
    // Fetch media data from Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=${accessToken}`
    );

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();

    // Filter images from the media data
    const images = data.data.filter(media => media.media_type === 'IMAGE').map(media => ({
      id: media.id,
      url: media.media_url,
      caption: media.caption,
      timestamp: media.timestamp,
    }));

    // Return the images as JSON
    return res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return res.status(500).json({ error: 'Failed to fetch Instagram posts.' });
  }
}
