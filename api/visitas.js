// Arquivo: /api/visitas.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }

    // Usaremos um nome de variável diferente para não misturar com o outro webhook
    const webhookUrl = process.env.DISCORD_VISITAS_URL;

    if (!webhookUrl) {
        return res.status(500).json({ error: 'URL do Webhook de visitas não configurada.' });
    }

    try {
        const discordResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        if (discordResponse.ok) {
            return res.status(200).json({ success: true, message: 'Visita registrada!' });
        } else {
            return res.status(discordResponse.status).json({ error: 'Erro ao repassar visita para o Discord.' });
        }
    } catch (error) {
        console.error("Erro na Vercel Function de Visitas:", error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
}
