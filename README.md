Bank Management Application

Overview
This is a fully functional Bank Management Application developed using Next.js for the full-stack development and Appwrite for the backend. It integrates Plaid for securely connecting users' bank accounts and Dwolla as the payment processor, both enabled through Plaid. The project is hosted on Vercel.

Key Features:-
Fully Responsive & Minimalist Design: Built using shadcn and Tailwind CSS for a clean and user-friendly interface.
Multi-Bank Connectivity: Allows users to connect more than one bank account.
Funds Transfer: Users can transfer funds using a sharable ID.
Transaction History: Maintains a detailed history of all transactions for easy tracking and management.
Error Management: Integrated Sentry to track and debug errors efficiently, which significantly streamlined the development process.

Project Link: https://bankify-nu.vercel.app/

How to Use:-
Sign Up
  During the signup process, use state NY or CA (or any state which plaid allows) and postal code 12345.
Connect Bank Account
  When connecting your bank account, use the sandbox demo variables provided by Plaid:
  Username: user_good
  Password: pass_good

env
#NEXT
NEXT_PUBLIC_SITE_URL=http://localhost:3000

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_ITEM_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
NEXT_APPWRITE_KEY=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=
PLAID_PRODUCTS=
PLAID_COUNTRY_CODES=

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=
DWOLLA_ENV=



