# Test Data Preparation: Knowledge Transfer Document

## Overview

This document outlines the steps and procedures for preparing test data using Cyberduck to SFTP files to S3, downloading .csv files, preparing test data, managing data loads, and managing data in a Type 2 dimension table. Additionally, it details the data flow in Snowflake from schema TM_RAW to TM_STAGING to TM_CONFORMED for each entity or table. This guide ensures consistency and accuracy in test data preparation processes.

## Tools and Technologies

- **Cyberduck**: An open-source client for FTP and SFTP, allowing seamless transfer of files to and from Amazon S3.
- **Amazon S3**: Cloud storage service where files are stored and accessed.
- **CSV Files**: Comma-separated values files used to manage data for testing purposes.
- **Snowflake**: Cloud-based data warehousing service used to store and manage data.

## Step-by-Step Procedure

### 1. Accessing Files via Cyberduck

1. **Open Cyberduck**: Launch the Cyberduck application on your local machine.
2. **Connect to S3**:
   - Select "Open Connection."
   - Choose "SFTP (SSH File Transfer Protocol)" as the protocol.
   - Enter the S3 endpoint URL, your username, and the appropriate credentials.
   - Click "Connect."

### 2. Downloading .csv Files

1. **Navigate to the Directory**: Use Cyberduck to navigate to the S3 bucket and the specific folder containing the .csv files.
2. **Download Files**:
   - Select the .csv file for each entity you need.
   - Right-click the file and select "Download To" to save it to your local machine.

### 3. Preparing Test Data

1. **Open the .csv File**: Use a spreadsheet application like Microsoft Excel or a text editor to open the .csv file.
2. **Analyze and Modify Data**:
   - Review the existing data in the file.
   - Add new test records, update existing records, and delete records as needed to cover your test scenarios.
   - Ensure data integrity and consistency while modifying the file.
3. **Save Changes**: Save the modified .csv file on your local machine, ensuring the file format and structure remain unchanged.

### 4. Uploading Files to S3

1. **Navigate to the Destination Folder**: In Cyberduck, navigate to the S3 folder where the file should be uploaded.
2. **Upload the File**:
   - Drag and drop the modified .csv file into the Cyberduck window.
   - Confirm any prompts to overwrite the existing file if the file name is the same.

### 5. Testing Type 2 Dimension Tables

To test Type 2 dimension tables, perform the following actions:

#### New Record Insert

1. **Identify New Records**: Add records that are completely new and do not exist in the current table.
2. **Insert New Records**: Ensure the new records are inserted into the dimension table with appropriate `valid_from` and `valid_to` dates.

#### Update Existing Record

1. **Detect Changes**: Identify records with changes in key combinations.
2. **Update Records**:
   - Update the existing records with new data.
   - Set the `valid_to` date of the old record to the current date minus one day.
   - Insert the new version of the record with the updated data and set the `valid_from` date to the current date.

#### Delete Existing Records

1. **Mark Records for Deletion**: Identify records that need to be deleted.
2. **Update Deletion**:
   - Set the `valid_to` date of the records to the current date, marking them as deleted.
   - Ensure that the `valid_from` and `valid_to` dates accurately reflect the period of validity.

#### Soft-Deleted Records Re-emerge

1. **Identify Soft-Deleted Records**: Locate records that have been marked as deleted but may re-emerge later.
2. **Re-insert Soft-Deleted Records**:
   - Update the soft-deleted records to re-activate them.
   - Set the `valid_from` date to the current date, reflecting their re-emergence.
   - Ensure the `valid_to` date is set appropriately to indicate the new period of validity.

### 6. Data Load Schedule

#### DELTA Load

1. **Applicable Entities**: ACCOUNTS, PARTY, PARTYACCOUNTSBRIDGE, and CASHFLOWFACT.
2. **Schedule**: DELTA load occurs from Tuesday to Saturday.
3. **File Arrival Time**: The DELTA file arrives in S3 by 7:40 PM NZ time.

#### FULL Load

1. **Applicable Entities**: ACCOUNTS, PARTY, PARTYACCOUNTSBRIDGE, and RISKRATING.
2. **Schedule**: The FULL file for ACCOUNTS, PARTY, and PARTYACCOUNTSBRIDGE arrives by 10:30 AM on the second Sunday of each month.
3. **RISKRATING**: This entity receives a FULL load every time, without DELTA loads.

### 7. Data Flow in Snowflake

#### TM_RAW Schema

- **Tables**: CTL_RAW_*, MFT_RAW_*, RAW_*
- **Purpose**: The TM_RAW schema contains raw data tables for each entity. There is no transformation applied at this stage, and the data is loaded to S3 without changing the datatype.

#### TM_STAGING Schema

- **Tables**:
  - **CTL_STG***: Control staging tables used for managing the control data during the staging process.
  - **STG_***: Staging tables that hold intermediate data before further processing.
  - **HIST_STG***: Historical staging tables used for storing historical data changes.
  - **STREAM_STG_***: Stream staging tables used for handling streaming data.
  - **DELTA_HIST_STG**: Delta historical staging tables used for managing changes in data for delta processing.
- **Purpose**: The TM_STAGING schema is used for intermediate processing and transformation of data before it is moved to the conformed layer.
  - **CTL_STG***: Control staging tables help manage metadata and control information during the data staging process.
  - **STG_***: These tables temporarily store data before transformation and further processing.
  - **HIST_STG***: Historical staging tables maintain a history of data changes, which is essential for auditing and rollback purposes.
  - **STREAM_STG_***: These tables handle incoming streaming data, allowing for real-time data processing and transformation.
  - **DELTA_HIST_STG**: Delta historical staging tables manage changes in data specifically for delta processing, ensuring accurate updates and inserts for incremental data loads.

#### TM_CONFORMED Schema

- **Tables**: FSC_*
- **Purpose**: The TM_CONFORMED schema contains the final conformed tables (FSC_*) that are used for reporting and analytics. This schema holds the standardized and cleansed data ready for business use.

## Conclusion

By following these steps, you will ensure that your test data is accurately prepared and maintained, supporting thorough and effective testing processes. Proper handling of data using Cyberduck and S3, along with careful manipulation of .csv files, adherence to the data load schedules, and understanding the data flow in Snowflake will lead to reliable and consistent results in your testing activities.
