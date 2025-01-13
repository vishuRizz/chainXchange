// middleware/clerkAuth.js
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressRequireAuth({
    onError: (err, res) => res.status(401).json({ error: 'Unauthorized: ' + err.message }),
});

module.exports = requireAuth;
