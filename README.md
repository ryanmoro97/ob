# Product Management System
Manage products from vendor pricelists through to sales channels.
### Stack
PostgreSQL, Express, React, Node
GraphQL, Sequelize, Apollo 

## Set up database tables and insert test values
npm run ./server/create-db
 - table deletion, creation, taxonomy/product/attribute/vendor insertion

## Run
npm start
 - starts client and nodemon server concurrently

## App
- View Product Obession Products
 - Filter on DB level (top level filters) 
 - Filter on dataset level (agGrid table filters)
  - Dropdown Filters populated with taxonomy tables (cat, subcat, vendors)
  - GraphQL api specific to OB/vendor table formats 

### Mode 1 - Product OB 
Main Product Table
Actions: Search, Reset, Update, Fill Models, AIM Update, AIM Export, BC Export, AgGrid Filters/Clear Filters
 - Search: Query DB with top level filters
 - Reset: Clear all top level filters
 - Update: Send modified rows to update DB tables
 - Fill Models: Assign next available skus to items (only one sub category must be present)
 - AIM Update: Export displayed rows in AIMUpdate Format excel file
 - AIM Export: Export displayed rows in AIMExport Format excel file
 - AgGrid Filters: Second level filters for all fields (text, numeric)
 - Clear Filters: Clear all level two filters
Filters(Top level): Category, SubCategory, Brand, Description, Model ID, SKU, Barcode(upc,ean), Part Number(vpn1,vpn2,vpn3,mpn)

### Mode 2 - Vendor -> OB 
Vendor Tables
Actions: Vendor Selector, Search, Reset, Update, Insert
 - Vendor Selector: Select vendor table to query/insert data from
 - Search: Query DB with top level filters
 - Reset: Clear all top level filters
 - Update: Send modified rows to update DB tables
 - Insert: Insert displayed rows from selected vendor table to OB
Filters(Top level): Brand, Description, Model ID, SKU, Barcode(upc,ean), Part Number(vpn,mpn), Model Year

### Mode 3 - Excel -> Vendor
Actions: Vendor Selector, File Selection, Update Prices, Insert, Import
 - Vendor Selector: Select vendor table to query/insert data from
 - File Selector: Select vendor pricelist excel file
 - Insert: 
  - Map vendor fields to OB schema
  - Update prices on existing product in vendor table and OB
  - Insert non-existing products into selected table
 - Import: 

### Mode 4 - SaqPK/VPN Import
Actions: File Selector, Import
 - File Selector: Select AIM SQLBrowse Sku/SaqPK/VPM excel file
 - Import: Update SaqPK/VPM fields in OB based on SKU



## Next 
#### Mode 1
- Maintain edited rows for Update (when Update is pressed || every 5 mins)
- Select Multiple rows -> Update (field) to (____)
- Add single item (Prompt Subcat, Brand)
- Copy/Paste items
 - assign new ID, wipe barcodes/upcs
- Toggle all fields or ones relevant to subcategory
 - sub_category must be selected (or 3 digits in model_id/new_sku)
 - reference taxonomy_sub_cat_fields table
- Pricing fields update on export (OurPrice, A, B, C)

### Mode 2
- Vendor table -> OB
 - Insert current selecion of products (viewable products, both filters apply)
 - Select sub_category
 - append (implicit) category, Inventory Type (A/S), Status, Tax Class, Units (default 1)  

### Mode 3
- Product vendor pricelists (integrate price update and new product import)
 - SQLBrowse SaqPK/part# Aim Export upload
 - Vendor pricelist
  - map vendor specific fields to OB format
  - enforce Brand on taxonomy list
   - correct selection option or add new brand
  - append non existing products to vendor table
  - update cost/retail (vendor & OB table) on existing upc/ean/vpn/mpn
  - maintain list of ids updated in OB -> AIM Update

### Mode 4
Values: SKU, SaqPK1, SaqPK2, SaqPK3, VPN1, VPN2, VPN3 
- assign new values based on sku

### Menu AIM/BC
- AIM + BigCommerce API integration
 - link ids
 - manage inventory levels
 - manage pricing / sales





## Table Grouping
### Main Product
ID, description, old_description, model, item, model_ID, SKU, 
old_sku, inventory_type, brand, category, sub_category, Status, 
tax_class, units, unit_of_measure

### Individual (include units for uniform numerical fields)
UPC, EAN, MPN, our_price, min_price, pos_reminder
min, max, Qty, Freight, Spiff, 
invoice_notes,Warranty, Locator, bar_label, date_in_house, sku_link, 
single, substitute_skus

### Vendor: Core 
vendor_item, vendor123_last_date, vendor123_qty
### Price:
Retail, cost, price_a, price_b, price_c, avg_cost, w_cost
### Ecom
body, online, web_visible, free_shipping, shipping, meta_title, 
meta_description, notes
### POS
saq_pk_1, saq_pk_2, saq_pk3 - different tables?
### Online
bc_product_id, bc_sku_id, bc_rule_id, bc_image_id
### Image - Core - for multiple images per item
url, image_url, image_path, image_title, image_type, delta
### Drivetrain
bottom_bracket_type, chainring_interface, chain_device_interface, 
chainline drop, teeth, Speed,  spindle_type, pedal_type, q_factor
### Hub
freehub_type,  hub_dimension, hub_flange,
### Wheel
erd, spoke_count, wheel_size, valve_type
### Suspension
rear_shock_interface,  resistance, stroke_length, suspension_type, 
### Cockpit
rake, reach, rise, shis, steer_tube, headset_interface, remote_interface
### Sizing
Height, Length, Width
### Brake_Attributes
brake_caliper_interface, brake_type, disc_brake_interface
### Popular
size, Color, gender, material, Weight, model_year
### Generic Attributes
actuation, created, experience, intended_use, fit, Flavor, frame_type, 
position, season, tags, version, selection_code
### Generic Measurements
angle, Capacity, Offset, Output, inside_diameter, outside_diameter, 
thread, Volume
### Dimensions
pkg_length, pkg_width, pkg_height, pkg_distance_unit, pkg_weight, 
pkg_weight_unit
### SubCategory Specific Attributes
display model year, relevant fields, tax class

