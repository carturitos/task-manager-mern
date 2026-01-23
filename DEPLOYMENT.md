# Free Deployment Options for Task Manager MERN

This guide covers **completely free** deployment options for your MERN stack application with Docker support.

## 🚀 Recommended Free Platforms

### 1. **Railway.app** (Recommended) ⭐

**Why Railway:**
- ✅ Free $5/month credit (enough for small projects)
- ✅ Native Docker support
- ✅ Automatic HTTPS
- ✅ Easy MongoDB integration
- ✅ GitHub integration with auto-deploy
- ✅ Environment variables management

**Deployment Steps:**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize project
railway init

# 4. Add MongoDB
railway add

# 5. Set environment variables
railway variables set JWT_SECRET=your_secret_here
railway variables set SMTP_EMAIL=your_email@gmail.com
railway variables set SMTP_PASSWORD=your_app_password

# 6. Deploy
railway up
```

**Alternative: Deploy via GitHub**
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "Start a New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will auto-detect Docker and deploy

---

### 2. **Render.com**

**Why Render:**
- ✅ Completely free tier
- ✅ Docker support
- ✅ Auto-deploy from GitHub
- ✅ Free PostgreSQL/MongoDB
- ✅ Custom domains
- ✅ Automatic SSL

**Deployment Steps:**

1. **Create `render.yaml`** in project root:

```yaml
services:
  # Backend
  - type: web
    name: task-manager-backend
    env: docker
    dockerfilePath: ./backend/Dockerfile
    envVars:
      - key: MONGO_URI
        fromDatabase:
          name: task-manager-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: SMTP_EMAIL
        value: your_email@gmail.com
      - key: SMTP_PASSWORD
        sync: false
      - key: FRONTEND_URL
        value: https://your-frontend.onrender.com

  # Frontend
  - type: web
    name: task-manager-frontend
    env: docker
    dockerfilePath: ./frontend/Dockerfile

databases:
  - name: task-manager-db
    databaseName: taskmanager
    user: admin
```

2. **Deploy:**
   - Push to GitHub
   - Go to [render.com](https://render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will auto-deploy

---

### 3. **Fly.io**

**Why Fly.io:**
- ✅ Free tier: 3 VMs with 256MB RAM each
- ✅ Excellent Docker support
- ✅ Global CDN
- ✅ Free SSL certificates

**Deployment Steps:**

```bash
# 1. Install Fly CLI
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# 2. Login
fly auth login

# 3. Launch backend
cd backend
fly launch --name task-manager-backend

# 4. Set secrets
fly secrets set JWT_SECRET=your_secret
fly secrets set SMTP_EMAIL=your_email@gmail.com
fly secrets set SMTP_PASSWORD=your_password

# 5. Deploy
fly deploy

# 6. Launch frontend
cd ../frontend
fly launch --name task-manager-frontend
fly deploy
```

---

### 4. **Vercel (Frontend) + Railway (Backend)**

**Best for:**
- Separating frontend and backend
- Maximum frontend performance

**Steps:**

**Frontend (Vercel):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

**Backend (Railway):**
```bash
# Deploy backend only
cd backend
railway up
```

---

## 🗄️ Free Database Options

### MongoDB Atlas (Recommended)
- ✅ 512MB free tier
- ✅ Shared cluster
- ✅ No credit card required

**Setup:**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create free cluster (M0)
4. Get connection string
5. Add to environment variables

### Railway PostgreSQL
- ✅ Free with Railway account
- ✅ Automatic backups
- ✅ Easy integration

---

## 📊 Comparison Table

| Platform | Free Tier | Docker Support | Database | Auto-Deploy | SSL | Best For |
|----------|-----------|----------------|----------|-------------|-----|----------|
| **Railway** | $5/month credit | ✅ Excellent | ✅ MongoDB | ✅ Yes | ✅ Yes | Full stack |
| **Render** | Unlimited | ✅ Good | ✅ PostgreSQL | ✅ Yes | ✅ Yes | Full stack |
| **Fly.io** | 3 VMs | ✅ Excellent | ❌ External | ✅ Yes | ✅ Yes | Docker apps |
| **Vercel** | Unlimited | ❌ Serverless | ❌ External | ✅ Yes | ✅ Yes | Frontend only |

---

## 🎯 Recommended Setup for Portfolio

**Option 1: All-in-One (Easiest)**
- **Platform**: Railway
- **Database**: Railway MongoDB
- **Cost**: Free ($5 credit/month)
- **Setup Time**: 10 minutes

**Option 2: Best Performance**
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: MongoDB Atlas
- **Cost**: Free
- **Setup Time**: 20 minutes

**Option 3: Full Control**
- **Platform**: Fly.io
- **Database**: MongoDB Atlas
- **Cost**: Free
- **Setup Time**: 30 minutes

---

## 🔧 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB connection string ready
- [ ] SMTP credentials for email
- [ ] Frontend API URL updated
- [ ] CORS configured for production domain
- [ ] Docker images tested locally
- [ ] Health check endpoint working
- [ ] GitHub repository up to date

---

## 🚨 Important Notes

### Free Tier Limitations

**Railway:**
- $5/month credit (~500 hours)
- Apps sleep after 30 min inactivity
- 1GB RAM limit

**Render:**
- Apps sleep after 15 min inactivity
- Cold start ~30 seconds
- 512MB RAM

**Fly.io:**
- 3 VMs max
- 256MB RAM per VM
- 3GB persistent storage

### Tips to Stay Free

1. **Optimize Docker images** - Use multi-stage builds
2. **Use MongoDB Atlas free tier** - 512MB is enough for portfolio
3. **Implement caching** - Reduce database calls
4. **Monitor usage** - Check platform dashboards regularly
5. **Use CDN** - For static assets (Cloudflare free tier)

---

## 📝 Example Deployment (Railway)

```bash
# Complete deployment in 5 commands
git clone https://github.com/carturitos/task-manager-mern.git
cd task-manager-mern
railway login
railway init
railway up

# Set environment variables in Railway dashboard
# Your app is live! 🎉
```

---

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [Fly.io Documentation](https://fly.io/docs/)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 💡 Pro Tips

1. **Use Railway for MVP** - Fastest deployment
2. **Add custom domain** - Most platforms support free custom domains
3. **Enable auto-deploy** - Push to main branch = automatic deployment
4. **Monitor logs** - Use platform dashboards to debug
5. **Set up alerts** - Get notified if app goes down

---

**Need help?** Open an issue on GitHub or check platform documentation.
