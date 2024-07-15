"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
// export const getAccounts = async ({ userId }: getAccountsProps) => {
//   try {
    
//     // get banks from db
//     const banks = await getBanks({ userId });
    

//     const accounts = await Promise.all(
//       banks?.map(async (bank: Bank) => {
//         // get each account info from plaid
        
        
//         const accountsResponse = await plaidClient.accountsGet({
//           access_token: bank.accessToken,
//           client_id:process.env.PLAID_CLIENT_ID!,
//           secret:process.env.PLAID_SECRET!,
//         });
        
        
//         const accountData = accountsResponse.data.accounts[0];

        

//         // get institution info from plaid
//         const institution = await getInstitution({
//           institutionId: accountsResponse.data.item.institution_id!,
          
//         });

        
        
        

//         const account = {
//           id: accountData.account_id,
//           availableBalance: accountData.balances.available!,
//           currentBalance: accountData.balances.current!,
//           institutionId: institution.institution_id,
//           name: accountData.name,
//           officialName: accountData.official_name,
//           mask: accountData.mask!,
//           type: accountData.type as string,
//           subtype: accountData.subtype! as string,
//           appwriteItemId: bank.$id,
//           sharableId: bank.sharableId,
          
//         };
        
        
        

//         return account;
//       })

//     )
//     if(accounts) console.log('accounts k baare mai jaankaari', accounts);
    
//     console.log('accounts-------',accounts)
//     const totalBanks = accounts.length; 
//     console.log('totalBanks: ', totalBanks);
    
//     const totalCurrentBalance = accounts.reduce((total, account) => {
//       return total + account.currentBalance;
//     }, 0);
    
// console.log('totalBalance: ', totalCurrentBalance);
//     return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
//   } catch (error) {
//     console.error("An error occurred while getting the accounts1:", error);
//   }
// };
// export const getAccounts = async ({ userId }: getAccountsProps) => {
//   try {
//     // Get banks from db
//     console.log('userId is ==',userId)
//     const banks = await getBanks({ userId });
//     if (!banks || banks.length === 0) {
//       throw new Error('No banks found for the user.');
//     }
//     console.log('banks data is---',banks)

//     const accounts: Account[] = [];

//     for (const bank of banks) {
//       try {
//         // Get each account info from Plaid
//         console.log('first loop---------------')
//         const accountsResponse = await plaidClient.accountsGet({
//           access_token: bank.accessToken,
//           client_id: process.env.PLAID_CLIENT_ID!,
//           secret: process.env.PLAID_SECRET!,
//         });
//         console.log('got the accountsResponse');
        

//         if (!accountsResponse || !accountsResponse.data || !accountsResponse.data.accounts) {
//           throw new Error('Invalid response from Plaid API');
//         }

//         const accountData = accountsResponse.data.accounts[0];
//         console.log('got the accountData');

//         // Get institution info from Plaid
//         const institution = await getInstitution({
//           institutionId: accountsResponse.data.item.institution_id!,
//         });

//         const account = {
//           id: accountData.account_id,
//           availableBalance: accountData.balances.available!,
//           currentBalance: accountData.balances.current!,
//           officialName: accountData.official_name,
//           mask: accountData.mask!,
//           institutionId: institution.institution_id,
//           name: accountData.name,
//           type: accountData.type as string,
//           subtype: accountData.subtype! as string,
//           appwriteItemId: bank.$id,
//           sharableId: bank.sharableId,
//         };

//         accounts.push(account);
//         console.log('loop ends');
        
//         console.log('accounts array',accounts);
//       } catch (err) {
//         console.error('Error fetching account info for bank:', bank.id, err);
//         // Optionally, you can continue processing other banks or break the loop
//       }
//     }

//     const totalBanks = accounts.length;
//     const totalCurrentBalance = accounts.reduce((total, account) => total + account.currentBalance, 0);

//     return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
//   } catch (error) {
//     console.error('An error occurred while getting the accounts:', error);
//     // Optionally, rethrow or handle the error as needed
//   }
// };

export const getAccounts = async ({ userId }: { userId: string }) => {
  try {
    // Get banks from db
    console.log('userId is ==', userId);
    const banks = await getBanks({ userId });
    if (!banks || banks.length === 0) {
      throw new Error('No banks found for the user.');
    }
    console.log('banks data is---', banks);

    const accountPromises = banks.map(async (bank: Bank) => {
      try {
        // Get each account info from Plaid
        console.log('Processing bank:', bank);
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
          client_id: process.env.PLAID_CLIENT_ID!,
          secret: process.env.PLAID_SECRET!,
        });
        console.log('Got the accountsResponse:', accountsResponse);

        if (!accountsResponse || !accountsResponse.data || !accountsResponse.data.accounts) {
          throw new Error('Invalid response from Plaid API');
        }

        const accountData = accountsResponse.data.accounts[0];
        console.log('Got the accountData:', accountData);

        // Get institution info from Plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          institutionId: institution.institution_id,
          name: accountData.name,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          sharableId: bank.sharableId,
        };

        return account;
      } catch (err) {
        console.error('Error fetching account info for bank:', bank.bankId, err);
        // Return null to signify failure, or handle it differently
        return null;
      }
    });

    // Wait for all promises to resolve
    const accounts = await Promise.all(accountPromises);
    console.log('All accounts fetched:', accounts);

    // Filter out any null results (if any bank fetching failed)
    const validAccounts = accounts.filter(account => account !== null) as Account[];
    console.log('Valid accounts:', validAccounts);

    const totalBanks = validAccounts.length;
    const totalCurrentBalance = validAccounts.reduce((total, account) => total + account.currentBalance, 0);

    return parseStringify({ data: validAccounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error('An error occurred while getting the accounts:', error);
    // Optionally, rethrow or handle the error as needed
    throw error;
  }
};



// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    console.log('appwrite item id ----',appwriteItemId)
    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });
    
    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
      client_id:process.env.PLAID_CLIENT_ID!,
      secret:process.env.PLAID_SECRET!,
    });
    const accountData = accountsResponse.data.accounts[0];
    
    // get transfer transactions from appwrite
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    

    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    );

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });
   
    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });


    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };
   
    // sort transactions by date such that the most recent transaction is first
      const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      client_id:process.env.PLAID_CLIENT_ID!,
      secret:process.env.PLAID_SECRET!,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts2:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
        client_id:process.env.PLAID_CLIENT_ID!,
        secret:process.env.PLAID_SECRET!,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts3:", error);
  }
};