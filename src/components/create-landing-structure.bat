@echo off
echo Creation de l'arborescence des composants Z-Chat...

REM Layout
mkdir layout
type nul > layout\AppLayout.tsx
type nul > layout\Header.tsx
type nul > layout\Footer.tsx

REM Hero
mkdir hero
type nul > hero\HeroSection.tsx
type nul > hero\HeroText.tsx
type nul > hero\HeroImage.tsx

REM Why
mkdir why
type nul > why\WhyZChatSection.tsx
type nul > why\WhyItem.tsx

REM Features
mkdir features
type nul > features\FeaturesSection.tsx
type nul > features\FeatureCard.tsx

REM Tech
mkdir tech
type nul > tech\TechStackSection.tsx
type nul > tech\TechItem.tsx

REM CTA
mkdir cta
type nul > cta\CTASection.tsx

REM About
mkdir about
type nul > about\AboutSection.tsx

echo Arborescence creee avec succes dans /components ✅
pause
