# 🚀 How to Get Your Permanent URL & QR Code

I have prepared your code. To make the QR code last forever (not just 1 day), follow these steps:

## Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `be-spectra`
3. Click **Create repository**

## Step 2: Push Your Code
Copy and paste these commands into your VS Code terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/be-spectra.git
git branch -M main
git push -u origin main
```
*(Replace YOUR_USERNAME with your actual GitHub username)*

## Step 3: Deploy Free on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your `be-spectra` repository
3. Click **Deploy**

🎉 **Done!**
You will get a URL like `https://be-spectra.vercel.app`

## Final Step: Update QR Code
1. Copy your new Vercel URL
2. Open `generate_qr_auto.py`
3. Paste the URL into line 18
4. Run `python generate_qr_auto.py`

Your QR code will now work **forever**!
