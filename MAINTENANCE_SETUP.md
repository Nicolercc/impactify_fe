# Maintenance Mode Setup

This document explains how the maintenance mode has been implemented for Impactify.

## What Was Done

1. **Created MaintenancePage Component** (`src/Components/MaintenancePage/MaintenancePage.jsx`)

   - Beautiful, responsive maintenance page
   - Countdown timer showing estimated return time
   - Feature preview section
   - Contact information
   - Social media links
   - Animated background elements

2. **Created MaintenancePage Styles** (`src/Components/MaintenancePage/MaintenancePage.css`)

   - Modern gradient background
   - Glass-morphism design
   - Smooth animations and transitions
   - Fully responsive design
   - Floating background elements

3. **Updated App.jsx**
   - Removed all backend API calls
   - Simplified to only show the maintenance page
   - Removed unused imports and components

## Features of the Maintenance Page

- **Countdown Timer**: Shows estimated time until service returns (currently set to 2 hours)
- **Feature Preview**: Displays upcoming improvements
- **Contact Information**: Provides support email for urgent issues
- **Social Links**: Keeps users connected during maintenance
- **Responsive Design**: Works perfectly on all device sizes
- **Beautiful Animations**: Engaging visual elements to keep users interested

## How to Switch Back to Normal Mode

When the backend is ready:

1. Revert the changes in `src/App.jsx` to restore the original functionality
2. Remove or comment out the maintenance page import
3. Restore the original App component with routing and API calls

## Customization Options

- **Timer Duration**: Modify the `targetTime` calculation in `MaintenancePage.jsx`
- **Contact Email**: Update the email address in the contact section
- **Social Links**: Add or modify social media links
- **Features**: Update the feature preview section with actual upcoming features
- **Colors**: Modify the CSS variables for different color schemes

## Best Practices Implemented

- ✅ No backend dependencies
- ✅ Fully responsive design
- ✅ Accessible markup
- ✅ Smooth animations
- ✅ Professional appearance
- ✅ Clear communication with users
- ✅ Contact information provided
- ✅ Social engagement maintained
