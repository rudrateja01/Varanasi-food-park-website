# VARANASI – THE FOOD PARK (Customer Website Preview)

This is a separate, customer-facing version containing the existing landing page and the `/order` menu page.

## Included
- Existing restaurant landing page and its sections.
- Existing `/order` page hero, complete menu data, category filters, search, add/remove quantity controls and cart drawer.
- Existing Fun Games experience.
- Existing images and visual assets.

## Not included
- Admin dashboard or analytics.
- Backend server and order APIs.
- Customer order history or table-bill management.
- Checkout, payment or order submission.

The **Proceed to Checkout** button is intentionally visible in the cart, but it has no click action. This preview does not send orders to the restaurant. The cart is stored in the current browser tab's session storage and is not shared with the restaurant or other devices.

## Run locally

Requires Node.js 22 or a compatible modern Node.js release.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The landing page is `/` and the menu page is `/order`.

## Build for static hosting

```bash
npm run build
npm run preview
```

The `vercel.json` rewrite and `public/_redirects` file route direct visits and refreshes of `/order` back through the React application.

## Before real restaurant ordering

This is a front-end preview only. To accept live orders, connect a production backend and persistent database, enable a real order submission flow, configure staff/admin access, and test the complete order-to-kitchen process before the restaurant uses it with customers.
