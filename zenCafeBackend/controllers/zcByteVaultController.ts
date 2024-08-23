

module.exports = {
    // Requires: Use the backend as a proxy server to avoid CORS policy
    fetchRadioJson: async (req, res) => {
        try {

            const options = { method: 'GET', headers: { 'User-Agent': 'ZCApi' } };
            const response = await fetch('https://raw.githubusercontent.com/TheByteVault/ZCByteVault/main/Music/playlists/radio.json', options);
            if (!response.ok) {
                throw new Error(`getPlaylistsJson Error: ${response.status}`);
            }
            const data = await response.json();
            const radioJson = data;

            res.status(200).json(radioJson);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}