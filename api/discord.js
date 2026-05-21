// Arquivo: /api/discord.js

export default async function handler(req, res) {
    // Permite apenas requisições POST (que enviam dados)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }

    // Pega a URL do Discord que estará escondida nas configurações da Vercel
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        return res.status(500).json({ error: 'URL do Webhook não configurada no servidor.' });
    }

    try {
        // Pega os dados que o seu site enviou (req.body) e manda para o Discord
        const discordResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        if (discordResponse.ok) {
            return res.status(200).json({ success: true, message: 'Enviado com sucesso!' });
        } else {
            return res.status(discordResponse.status).json({ error: 'Erro ao repassar para o Discord.' });
        }
    } catch (error) {
        console.error("Erro na Vercel Function:", error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
}
