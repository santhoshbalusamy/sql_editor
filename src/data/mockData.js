// Helper function to generate additional customer data
function generateCustomers() {
  const baseCustomers = [
    { CustomerID: 'ALFKI', CompanyName: 'Alfreds Futterkiste', ContactName: 'Maria Anders', City: 'Berlin', Country: 'Germany', Phone: '030-0074321' },
    { CustomerID: 'ANATR', CompanyName: 'Ana Trujillo Emparedados y helados', ContactName: 'Ana Trujillo', City: 'México D.F.', Country: 'Mexico', Phone: '(5) 555-4729' },
    { CustomerID: 'ANTON', CompanyName: 'Antonio Moreno Taquería', ContactName: 'Antonio Moreno', City: 'México D.F.', Country: 'Mexico', Phone: '(5) 555-3932' },
    { CustomerID: 'AROUT', CompanyName: 'Around the Horn', ContactName: 'Thomas Hardy', City: 'London', Country: 'UK', Phone: '(171) 555-7788' },
    { CustomerID: 'BERGS', CompanyName: 'Berglunds snabbköp', ContactName: 'Christina Berglund', City: 'Luleå', Country: 'Sweden', Phone: '0921-12 34 65' },
    { CustomerID: 'BLAUS', CompanyName: 'Blauer See Delikatessen', ContactName: 'Hanna Moos', City: 'Mannheim', Country: 'Germany', Phone: '0621-08460' },
    { CustomerID: 'BLONP', CompanyName: 'Blondel père et fils', ContactName: 'Frédérique Citeaux', City: 'Strasbourg', Country: 'France', Phone: '88.60.15.31' },
    { CustomerID: 'BOLID', CompanyName: 'Bólido Comidas preparadas', ContactName: 'Martín Sommer', City: 'Madrid', Country: 'Spain', Phone: '(91) 555 22 82' },
    { CustomerID: 'BONAP', CompanyName: 'Bon app\'', ContactName: 'Laurence Lebihans', City: 'Marseille', Country: 'France', Phone: '91.24.45.40' },
    { CustomerID: 'BOTTM', CompanyName: 'Bottom-Dollar Markets', ContactName: 'Elizabeth Lincoln', City: 'Tsawassen', Country: 'Canada', Phone: '(604) 555-4729' },
    { CustomerID: 'BSBEV', CompanyName: 'B\'s Beverages', ContactName: 'Victoria Ashworth', City: 'London', Country: 'UK', Phone: '(171) 555-1212' },
    { CustomerID: 'CACTU', CompanyName: 'Cactus Comidas para llevar', ContactName: 'Patricio Simpson', City: 'Buenos Aires', Country: 'Argentina', Phone: '(1) 135-5555' },
    { CustomerID: 'CENTC', CompanyName: 'Centro comercial Moctezuma', ContactName: 'Francisco Chang', City: 'México D.F.', Country: 'Mexico', Phone: '(5) 555-3392' },
    { CustomerID: 'CHOPS', CompanyName: 'Chop-suey Chinese', ContactName: 'Yang Wang', City: 'Bern', Country: 'Switzerland', Phone: '0452-076545' },
    { CustomerID: 'COMMI', CompanyName: 'Comércio Mineiro', ContactName: 'Pedro Afonso', City: 'São Paulo', Country: 'Brazil', Phone: '(11) 555-7647' },
    { CustomerID: 'CONSH', CompanyName: 'Consolidated Holdings', ContactName: 'Elizabeth Brown', City: 'London', Country: 'UK', Phone: '(171) 555-2282' },
    { CustomerID: 'DRACD', CompanyName: 'Drachenblut Delikatessen', ContactName: 'Sven Ottlieb', City: 'Aachen', Country: 'Germany', Phone: '0241-039123' },
    { CustomerID: 'DUMON', CompanyName: 'Du monde entier', ContactName: 'Janine Labrune', City: 'Nantes', Country: 'France', Phone: '40.67.88.88' },
    { CustomerID: 'EASTC', CompanyName: 'Eastern Connection', ContactName: 'Ann Devon', City: 'London', Country: 'UK', Phone: '(171) 555-0297' },
    { CustomerID: 'ERNSH', CompanyName: 'Ernst Handel', ContactName: 'Roland Mendel', City: 'Graz', Country: 'Austria', Phone: '7675-3425' },
    { CustomerID: 'FAMIA', CompanyName: 'Familia Arquibaldo', ContactName: 'Aria Cruz', City: 'São Paulo', Country: 'Brazil', Phone: '(11) 555-9857' }
  ];

  // Generate additional customers to reach 120+ records
  const additionalCustomers = [];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'San Francisco', 'Indianapolis', 'Columbus', 'Fort Worth', 'Charlotte', 'Seattle', 'Denver', 'Boston'];
  const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Italy', 'Spain', 'Australia', 'Japan', 'Brazil', 'Mexico', 'Argentina', 'India', 'China', 'South Korea'];
  const companySuffixes = ['Inc', 'LLC', 'Ltd', 'Corp', 'Group', 'Enterprises', 'Solutions', 'Services', 'Industries', 'International'];

  for (let i = 22; i <= 120; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)];
    const customerID = `CUST${String(i).padStart(3, '0')}`;
    const companyName = `${city} ${suffix}`;
    const contactName = `Contact ${i}`;
    const phone = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;

    additionalCustomers.push({
      CustomerID: customerID,
      CompanyName: companyName,
      ContactName: contactName,
      City: city,
      Country: country,
      Phone: phone
    });
  }

  return [...baseCustomers, ...additionalCustomers];
}

// Helper function to generate additional orders
function generateOrders() {
  const baseOrders = [
    { OrderID: 10248, CustomerID: 'VINET', OrderDate: '1996-07-04', ShipCity: 'Reims', ShipCountry: 'France', Freight: 32.38 },
    { OrderID: 10249, CustomerID: 'TOMSP', OrderDate: '1996-07-05', ShipCity: 'Münster', ShipCountry: 'Germany', Freight: 11.61 },
    { OrderID: 10250, CustomerID: 'HANAR', OrderDate: '1996-07-08', ShipCity: 'Rio de Janeiro', ShipCountry: 'Brazil', Freight: 65.83 },
    { OrderID: 10251, CustomerID: 'VICTE', OrderDate: '1996-07-08', ShipCity: 'Lyon', ShipCountry: 'France', Freight: 41.34 },
    { OrderID: 10252, CustomerID: 'SUPRD', OrderDate: '1996-07-09', ShipCity: 'Charleroi', ShipCountry: 'Belgium', Freight: 51.30 },
    { OrderID: 10253, CustomerID: 'HANAR', OrderDate: '1996-07-10', ShipCity: 'Rio de Janeiro', ShipCountry: 'Brazil', Freight: 58.17 },
    { OrderID: 10254, CustomerID: 'CHOPS', OrderDate: '1996-07-11', ShipCity: 'Bern', ShipCountry: 'Switzerland', Freight: 22.98 },
    { OrderID: 10255, CustomerID: 'RICSU', OrderDate: '1996-07-12', ShipCity: 'Genève', ShipCountry: 'Switzerland', Freight: 148.33 },
    { OrderID: 10256, CustomerID: 'WELLI', OrderDate: '1996-07-15', ShipCity: 'Resende', ShipCountry: 'Brazil', Freight: 13.97 },
    { OrderID: 10257, CustomerID: 'HILAA', OrderDate: '1996-07-16', ShipCity: 'San Cristóbal', ShipCountry: 'Venezuela', Freight: 81.91 },
    { OrderID: 10258, CustomerID: 'ERNSH', OrderDate: '1996-07-17', ShipCity: 'Graz', ShipCountry: 'Austria', Freight: 140.51 },
    { OrderID: 10259, CustomerID: 'CENTC', OrderDate: '1996-07-18', ShipCity: 'México D.F.', ShipCountry: 'Mexico', Freight: 3.25 },
    { OrderID: 10260, CustomerID: 'OTTIK', OrderDate: '1996-07-19', ShipCity: 'Köln', ShipCountry: 'Germany', Freight: 55.09 },
    { OrderID: 10261, CustomerID: 'QUEDE', OrderDate: '1996-07-19', ShipCity: 'Rio de Janeiro', ShipCountry: 'Brazil', Freight: 3.05 },
    { OrderID: 10262, CustomerID: 'RATTC', OrderDate: '1996-07-22', ShipCity: 'Albuquerque', ShipCountry: 'USA', Freight: 48.29 },
    { OrderID: 10263, CustomerID: 'ERNSH', OrderDate: '1996-07-23', ShipCity: 'Graz', ShipCountry: 'Austria', Freight: 146.06 },
    { OrderID: 10264, CustomerID: 'FOLKO', OrderDate: '1996-07-24', ShipCity: 'Bräcke', ShipCountry: 'Sweden', Freight: 3.67 },
    { OrderID: 10265, CustomerID: 'BLONP', OrderDate: '1996-07-25', ShipCity: 'Strasbourg', ShipCountry: 'France', Freight: 55.28 },
    { OrderID: 10266, CustomerID: 'WARTH', OrderDate: '1996-07-26', ShipCity: 'Oulu', ShipCountry: 'Finland', Freight: 25.73 },
    { OrderID: 10267, CustomerID: 'FRANK', OrderDate: '1996-07-29', ShipCity: 'München', ShipCountry: 'Germany', Freight: 208.58 },
    { OrderID: 10268, CustomerID: 'GROSR', OrderDate: '1996-07-30', ShipCity: 'Caracas', ShipCountry: 'Venezuela', Freight: 66.29 },
    { OrderID: 10269, CustomerID: 'WHITC', OrderDate: '1996-07-31', ShipCity: 'Seattle', ShipCountry: 'USA', Freight: 4.56 },
    { OrderID: 10270, CustomerID: 'WARTH', OrderDate: '1996-08-01', ShipCity: 'Oulu', ShipCountry: 'Finland', Freight: 136.54 },
    { OrderID: 10271, CustomerID: 'SPLIR', OrderDate: '1996-08-01', ShipCity: 'Lander', ShipCountry: 'USA', Freight: 4.54 },
    { OrderID: 10272, CustomerID: 'RATTC', OrderDate: '1996-08-02', ShipCity: 'Albuquerque', ShipCountry: 'USA', Freight: 98.03 },
    { OrderID: 10273, CustomerID: 'QUICK', OrderDate: '1996-08-05', ShipCity: 'Cunewalde', ShipCountry: 'Germany', Freight: 76.07 },
    { OrderID: 10274, CustomerID: 'VINET', OrderDate: '1996-08-06', ShipCity: 'Reims', ShipCountry: 'France', Freight: 6.01 },
    { OrderID: 10275, CustomerID: 'MAGAA', OrderDate: '1996-08-07', ShipCity: 'Bergamo', ShipCountry: 'Italy', Freight: 26.93 },
    { OrderID: 10276, CustomerID: 'TORTU', OrderDate: '1996-08-08', ShipCity: 'México D.F.', ShipCountry: 'Mexico', Freight: 13.84 },
    { OrderID: 10277, CustomerID: 'MORGK', OrderDate: '1996-08-09', ShipCity: 'Leipzig', ShipCountry: 'Germany', Freight: 125.77 }
  ];

  // Generate additional orders to reach 200+ records
  const additionalOrders = [];
  const shipCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'London', 'Berlin', 'Paris', 'Tokyo', 'Sydney', 'Toronto', 'Madrid', 'Rome', 'Amsterdam', 'Stockholm', 'Copenhagen', 'Vienna', 'Zurich', 'Brussels', 'Dublin', 'Oslo'];
  const shipCountries = ['USA', 'UK', 'Germany', 'France', 'Japan', 'Australia', 'Canada', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Denmark', 'Austria', 'Switzerland', 'Belgium', 'Ireland', 'Norway'];
  const customerIDs = ['ALFKI', 'ANATR', 'ANTON', 'AROUT', 'BERGS', 'BLAUS', 'BLONP', 'BOLID', 'BONAP', 'BOTTM', 'BSBEV', 'CACTU', 'CENTC', 'CHOPS', 'COMMI', 'CONSH', 'DRACD', 'DUMON', 'EASTC', 'ERNSH', 'FAMIA'];

  // Generate orders from 1996 to 1998
  const startDate = new Date('1996-01-01');
  const endDate = new Date('1998-12-31');

  for (let i = 10278; i <= 10350; i++) {
    const daysDiff = Math.floor(Math.random() * ((endDate - startDate) / (1000 * 60 * 60 * 24)));
    const orderDate = new Date(startDate);
    orderDate.setDate(orderDate.getDate() + daysDiff);
    const orderDateStr = orderDate.toISOString().split('T')[0];

    const shipCity = shipCities[Math.floor(Math.random() * shipCities.length)];
    const shipCountry = shipCountries[Math.floor(Math.random() * shipCountries.length)];
    const customerID = customerIDs[Math.floor(Math.random() * customerIDs.length)];
    const freight = Math.round((Math.random() * 200 + 5) * 100) / 100;

    additionalOrders.push({
      OrderID: i,
      CustomerID: customerID,
      OrderDate: orderDateStr,
      ShipCity: shipCity,
      ShipCountry: shipCountry,
      Freight: freight
    });
  }

  return [...baseOrders, ...additionalOrders];
}

// Helper function to generate additional products
function generateProducts() {
  const baseProducts = [
    { ProductID: 1, ProductName: 'Chai', CategoryID: 1, UnitPrice: 18.00, UnitsInStock: 39, SupplierID: 1 },
    { ProductID: 2, ProductName: 'Chang', CategoryID: 1, UnitPrice: 19.00, UnitsInStock: 17, SupplierID: 1 },
    { ProductID: 3, ProductName: 'Aniseed Syrup', CategoryID: 2, UnitPrice: 10.00, UnitsInStock: 13, SupplierID: 1 },
    { ProductID: 4, ProductName: 'Chef Anton\'s Cajun Seasoning', CategoryID: 2, UnitPrice: 22.00, UnitsInStock: 53, SupplierID: 2 },
    { ProductID: 5, ProductName: 'Chef Anton\'s Gumbo Mix', CategoryID: 2, UnitPrice: 21.35, UnitsInStock: 0, SupplierID: 2 },
    { ProductID: 6, ProductName: 'Grandma\'s Boysenberry Spread', CategoryID: 2, UnitPrice: 25.00, UnitsInStock: 120, SupplierID: 3 },
    { ProductID: 7, ProductName: 'Uncle Bob\'s Organic Dried Pears', CategoryID: 7, UnitPrice: 30.00, UnitsInStock: 15, SupplierID: 3 },
    { ProductID: 8, ProductName: 'Northwoods Cranberry Sauce', CategoryID: 2, UnitPrice: 40.00, UnitsInStock: 6, SupplierID: 3 },
    { ProductID: 9, ProductName: 'Mishi Kobe Niku', CategoryID: 6, UnitPrice: 97.00, UnitsInStock: 29, SupplierID: 4 },
    { ProductID: 10, ProductName: 'Ikura', CategoryID: 8, UnitPrice: 31.00, UnitsInStock: 31, SupplierID: 4 },
    { ProductID: 11, ProductName: 'Queso Cabrales', CategoryID: 4, UnitPrice: 21.00, UnitsInStock: 22, SupplierID: 5 },
    { ProductID: 12, ProductName: 'Queso Manchego La Pastora', CategoryID: 4, UnitPrice: 38.00, UnitsInStock: 86, SupplierID: 5 },
    { ProductID: 13, ProductName: 'Konbu', CategoryID: 8, UnitPrice: 6.00, UnitsInStock: 24, SupplierID: 6 },
    { ProductID: 14, ProductName: 'Tofu', CategoryID: 7, UnitPrice: 23.25, UnitsInStock: 35, SupplierID: 6 },
    { ProductID: 15, ProductName: 'Pavlova', CategoryID: 3, UnitPrice: 17.45, UnitsInStock: 29, SupplierID: 7 },
    { ProductID: 16, ProductName: 'Carnarvon Tigers', CategoryID: 8, UnitPrice: 62.50, UnitsInStock: 42, SupplierID: 7 },
    { ProductID: 17, ProductName: 'Teatime Chocolate Biscuits', CategoryID: 3, UnitPrice: 9.20, UnitsInStock: 25, SupplierID: 8 },
    { ProductID: 18, ProductName: 'Sir Rodney\'s Marmalade', CategoryID: 3, UnitPrice: 81.00, UnitsInStock: 40, SupplierID: 8 },
    { ProductID: 19, ProductName: 'Sir Rodney\'s Scones', CategoryID: 3, UnitPrice: 10.00, UnitsInStock: 3, SupplierID: 8 },
    { ProductID: 20, ProductName: 'Boston Crab Meat', CategoryID: 8, UnitPrice: 18.40, UnitsInStock: 123, SupplierID: 19 },
    { ProductID: 21, ProductName: 'Jack\'s New England Clam Chowder', CategoryID: 8, UnitPrice: 9.65, UnitsInStock: 85, SupplierID: 19 },
    { ProductID: 22, ProductName: 'Singaporean Hokkien Fried Mee', CategoryID: 5, UnitPrice: 14.00, UnitsInStock: 26, SupplierID: 20 },
    { ProductID: 23, ProductName: 'Ipoh Coffee', CategoryID: 1, UnitPrice: 46.00, UnitsInStock: 17, SupplierID: 20 },
    { ProductID: 24, ProductName: 'Gula Malacca', CategoryID: 2, UnitPrice: 19.45, UnitsInStock: 27, SupplierID: 20 },
    { ProductID: 25, ProductName: 'Rogede sild', CategoryID: 8, UnitPrice: 9.50, UnitsInStock: 5, SupplierID: 21 }
  ];

  // Generate additional products to reach 120+ records
  const additionalProducts = [];
  const productCategories = [
    { name: 'Beverages', categoryID: 1, priceRange: [5, 50] },
    { name: 'Condiments', categoryID: 2, priceRange: [3, 30] },
    { name: 'Confections', categoryID: 3, priceRange: [5, 100] },
    { name: 'Dairy Products', categoryID: 4, priceRange: [10, 50] },
    { name: 'Grains/Cereals', categoryID: 5, priceRange: [5, 25] },
    { name: 'Meat/Poultry', categoryID: 6, priceRange: [20, 150] },
    { name: 'Produce', categoryID: 7, priceRange: [5, 40] },
    { name: 'Seafood', categoryID: 8, priceRange: [8, 80] }
  ];

  const productNames = [
    'Premium', 'Organic', 'Deluxe', 'Classic', 'Special', 'Gourmet', 'Artisan', 'Traditional',
    'Fresh', 'Natural', 'Authentic', 'Select', 'Choice', 'Fine', 'Superior', 'Exclusive'
  ];

  const productTypes = [
    'Coffee', 'Tea', 'Juice', 'Soda', 'Water', 'Wine', 'Beer', 'Chocolate', 'Candy', 'Cake',
    'Bread', 'Pasta', 'Rice', 'Cereal', 'Milk', 'Cheese', 'Yogurt', 'Butter', 'Eggs',
    'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp', 'Salmon', 'Tuna', 'Lobster', 'Crab',
    'Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry', 'Blueberry', 'Tomato', 'Lettuce',
    'Sauce', 'Spice', 'Seasoning', 'Oil', 'Vinegar', 'Honey', 'Jam', 'Preserve'
  ];

  for (let i = 26; i <= 120; i++) {
    const category = productCategories[Math.floor(Math.random() * productCategories.length)];
    const prefix = productNames[Math.floor(Math.random() * productNames.length)];
    const type = productTypes[Math.floor(Math.random() * productTypes.length)];
    const productName = `${prefix} ${type}`;
    const [minPrice, maxPrice] = category.priceRange;
    const unitPrice = Math.round((Math.random() * (maxPrice - minPrice) + minPrice) * 100) / 100;
    const unitsInStock = Math.floor(Math.random() * 200);
    const supplierID = Math.floor(Math.random() * 20) + 1;

    additionalProducts.push({
      ProductID: i,
      ProductName: productName,
      CategoryID: category.categoryID,
      UnitPrice: unitPrice,
      UnitsInStock: unitsInStock,
      SupplierID: supplierID
    });
  }

  return [...baseProducts, ...additionalProducts];
}

// Helper function to generate additional order details
function generateOrderDetails() {
  const baseOrderDetails = [
    { OrderID: 10248, ProductID: 11, Quantity: 12, UnitPrice: 14.00, Discount: 0 },
    { OrderID: 10248, ProductID: 42, Quantity: 10, UnitPrice: 9.80, Discount: 0 },
    { OrderID: 10248, ProductID: 72, Quantity: 5, UnitPrice: 34.80, Discount: 0 },
    { OrderID: 10249, ProductID: 14, Quantity: 9, UnitPrice: 18.60, Discount: 0 },
    { OrderID: 10249, ProductID: 51, Quantity: 40, UnitPrice: 42.40, Discount: 0 },
    { OrderID: 10250, ProductID: 41, Quantity: 10, UnitPrice: 7.70, Discount: 0 },
    { OrderID: 10250, ProductID: 51, Quantity: 35, UnitPrice: 42.40, Discount: 0.15 },
    { OrderID: 10250, ProductID: 65, Quantity: 15, UnitPrice: 16.80, Discount: 0.15 },
    { OrderID: 10251, ProductID: 22, Quantity: 6, UnitPrice: 16.80, Discount: 0.05 },
    { OrderID: 10251, ProductID: 57, Quantity: 15, UnitPrice: 15.60, Discount: 0.05 },
    { OrderID: 10251, ProductID: 65, Quantity: 20, UnitPrice: 16.80, Discount: 0 },
    { OrderID: 10252, ProductID: 20, Quantity: 40, UnitPrice: 64.80, Discount: 0.05 },
    { OrderID: 10252, ProductID: 33, Quantity: 25, UnitPrice: 2.00, Discount: 0.05 },
    { OrderID: 10252, ProductID: 60, Quantity: 40, UnitPrice: 27.20, Discount: 0 },
    { OrderID: 10253, ProductID: 31, Quantity: 20, UnitPrice: 10.00, Discount: 0 },
    { OrderID: 10253, ProductID: 39, Quantity: 42, UnitPrice: 14.40, Discount: 0 },
    { OrderID: 10253, ProductID: 49, Quantity: 40, UnitPrice: 16.00, Discount: 0 },
    { OrderID: 10254, ProductID: 24, Quantity: 15, UnitPrice: 3.60, Discount: 0.15 },
    { OrderID: 10254, ProductID: 55, Quantity: 21, UnitPrice: 19.20, Discount: 0.15 },
    { OrderID: 10254, ProductID: 74, Quantity: 21, UnitPrice: 8.00, Discount: 0 },
    { OrderID: 10255, ProductID: 2, Quantity: 20, UnitPrice: 15.20, Discount: 0 },
    { OrderID: 10255, ProductID: 16, Quantity: 35, UnitPrice: 13.90, Discount: 0 },
    { OrderID: 10255, ProductID: 36, Quantity: 25, UnitPrice: 15.20, Discount: 0 },
    { OrderID: 10255, ProductID: 59, Quantity: 30, UnitPrice: 44.00, Discount: 0 },
    { OrderID: 10256, ProductID: 53, Quantity: 15, UnitPrice: 26.20, Discount: 0 },
    { OrderID: 10256, ProductID: 77, Quantity: 12, UnitPrice: 10.40, Discount: 0 },
    { OrderID: 10257, ProductID: 27, Quantity: 25, UnitPrice: 35.10, Discount: 0 },
    { OrderID: 10257, ProductID: 39, Quantity: 6, UnitPrice: 14.40, Discount: 0 },
    { OrderID: 10257, ProductID: 77, Quantity: 15, UnitPrice: 10.40, Discount: 0 },
    { OrderID: 10258, ProductID: 2, Quantity: 50, UnitPrice: 15.20, Discount: 0.20 },
    { OrderID: 10258, ProductID: 5, Quantity: 65, UnitPrice: 17.00, Discount: 0.20 },
    { OrderID: 10258, ProductID: 32, Quantity: 6, UnitPrice: 25.60, Discount: 0 },
    { OrderID: 10259, ProductID: 21, Quantity: 10, UnitPrice: 8.00, Discount: 0 },
    { OrderID: 10259, ProductID: 37, Quantity: 1, UnitPrice: 20.80, Discount: 0 },
    { OrderID: 10260, ProductID: 41, Quantity: 16, UnitPrice: 7.70, Discount: 0.25 },
    { OrderID: 10260, ProductID: 57, Quantity: 50, UnitPrice: 15.60, Discount: 0 },
    { OrderID: 10260, ProductID: 62, Quantity: 15, UnitPrice: 39.40, Discount: 0.25 },
    { OrderID: 10260, ProductID: 70, Quantity: 21, UnitPrice: 12.00, Discount: 0.25 },
    { OrderID: 10261, ProductID: 21, Quantity: 20, UnitPrice: 8.00, Discount: 0 },
    { OrderID: 10261, ProductID: 35, Quantity: 20, UnitPrice: 14.40, Discount: 0 },
    { OrderID: 10262, ProductID: 5, Quantity: 12, UnitPrice: 17.00, Discount: 0.20 },
    { OrderID: 10262, ProductID: 7, Quantity: 15, UnitPrice: 24.00, Discount: 0 },
    { OrderID: 10262, ProductID: 56, Quantity: 2, UnitPrice: 30.40, Discount: 0 },
    { OrderID: 10263, ProductID: 16, Quantity: 60, UnitPrice: 13.90, Discount: 0.25 },
    { OrderID: 10263, ProductID: 24, Quantity: 28, UnitPrice: 3.60, Discount: 0 },
    { OrderID: 10263, ProductID: 30, Quantity: 60, UnitPrice: 20.70, Discount: 0.25 },
    { OrderID: 10263, ProductID: 74, Quantity: 36, UnitPrice: 8.00, Discount: 0 },
    { OrderID: 10264, ProductID: 2, Quantity: 35, UnitPrice: 15.20, Discount: 0 },
    { OrderID: 10264, ProductID: 41, Quantity: 25, UnitPrice: 7.70, Discount: 0.15 },
    { OrderID: 10265, ProductID: 17, Quantity: 30, UnitPrice: 31.20, Discount: 0 },
    { OrderID: 10265, ProductID: 70, Quantity: 20, UnitPrice: 12.00, Discount: 0 }
  ];

  // Generate additional order details to reach 300+ records
  const additionalOrderDetails = [];
  const orderIDs = Array.from({ length: 150 }, (_, i) => 10248 + i); // Orders 10248-10397
  const productIDs = Array.from({ length: 120 }, (_, i) => i + 1); // Products 1-120

  for (let i = 0; i < 250; i++) {
    const orderID = orderIDs[Math.floor(Math.random() * orderIDs.length)];
    const productID = productIDs[Math.floor(Math.random() * productIDs.length)];
    const quantity = Math.floor(Math.random() * 100) + 1;
    const unitPrice = Math.round((Math.random() * 100 + 5) * 100) / 100;
    const discount = Math.random() < 0.3 ? Math.round((Math.random() * 0.25) * 100) / 100 : 0;

    additionalOrderDetails.push({
      OrderID: orderID,
      ProductID: productID,
      Quantity: quantity,
      UnitPrice: unitPrice,
      Discount: discount
    });
  }

  return [...baseOrderDetails, ...additionalOrderDetails];
}

// Mock data structures based on Northwind database
export const mockTables = {
  Customers: generateCustomers(),
  Orders: generateOrders(),
  Products: generateProducts(),
  Employees: [
    { EmployeeID: 1, FirstName: 'Nancy', LastName: 'Davolio', Title: 'Sales Representative', City: 'Seattle', Country: 'USA' },
    { EmployeeID: 2, FirstName: 'Andrew', LastName: 'Fuller', Title: 'Vice President, Sales', City: 'Tacoma', Country: 'USA' },
    { EmployeeID: 3, FirstName: 'Janet', LastName: 'Leverling', Title: 'Sales Representative', City: 'Kirkland', Country: 'USA' },
    { EmployeeID: 4, FirstName: 'Margaret', LastName: 'Peacock', Title: 'Sales Representative', City: 'Redmond', Country: 'USA' },
    { EmployeeID: 5, FirstName: 'Steven', LastName: 'Buchanan', Title: 'Sales Manager', City: 'London', Country: 'UK' },
    { EmployeeID: 6, FirstName: 'Michael', LastName: 'Suyama', Title: 'Sales Representative', City: 'London', Country: 'UK' },
    { EmployeeID: 7, FirstName: 'Robert', LastName: 'King', Title: 'Sales Representative', City: 'London', Country: 'UK' },
    { EmployeeID: 8, FirstName: 'Laura', LastName: 'Callahan', Title: 'Inside Sales Coordinator', City: 'Seattle', Country: 'USA' },
    { EmployeeID: 9, FirstName: 'Anne', LastName: 'Dodsworth', Title: 'Sales Representative', City: 'London', Country: 'UK' }
  ],
  OrderDetails: generateOrderDetails()
};

// Predefined queries with their corresponding results
export const predefinedQueries = [
  {
    id: 1,
    name: 'Basic Customer Data',
    category: 'Customers',
    description: 'Retrieve first 10 customer records',
    query: 'SELECT * FROM Customers LIMIT 10',
    result: mockTables.Customers.slice(0, 10)
  },
  {
    id: 9,
    name: 'All Customers (Paginated)',
    category: 'Customers',
    description: 'View all customers - demonstrates pagination with 120+ records',
    query: 'SELECT * FROM Customers ORDER BY CompanyName',
    result: [...mockTables.Customers].sort((a, b) => a.CompanyName.localeCompare(b.CompanyName))
  },
  {
    id: 2,
    name: 'Recent Orders',
    category: 'Orders',
    description: 'Get orders from 1996 onwards, ordered by date',
    query: "SELECT * FROM Orders WHERE OrderDate >= '1996-01-01' ORDER BY OrderDate DESC",
    result: mockTables.Orders.filter(o => o.OrderDate >= '1996-01-01').sort((a, b) => b.OrderDate.localeCompare(a.OrderDate))
  },
  {
    id: 10,
    name: 'All Orders (Paginated)',
    category: 'Orders',
    description: 'View all orders - demonstrates pagination with 200+ records',
    query: 'SELECT * FROM Orders ORDER BY OrderDate DESC',
    result: [...mockTables.Orders].sort((a, b) => b.OrderDate.localeCompare(a.OrderDate))
  },
  {
    id: 3,
    name: 'Order Count',
    category: 'Analytics',
    description: 'Count total number of orders',
    query: 'SELECT COUNT(*) as TotalOrders FROM Orders',
    result: [{ TotalOrders: mockTables.Orders.length }]
  },
  {
    id: 4,
    name: 'Customer-Order Join',
    category: 'Joins',
    description: 'Join customers with their orders',
    query: 'SELECT c.CompanyName, o.OrderID, o.OrderDate FROM Customers c JOIN Orders o ON c.CustomerID = o.CustomerID LIMIT 20',
    result: mockTables.Orders.slice(0, 20).map(order => {
      const customer = mockTables.Customers.find(c => c.CustomerID === order.CustomerID);
      return {
        CompanyName: customer ? customer.CompanyName : 'Unknown',
        OrderID: order.OrderID,
        OrderDate: order.OrderDate
      };
    })
  },
  {
    id: 5,
    name: 'Available Products',
    category: 'Products',
    description: 'List products in stock, sorted by price',
    query: 'SELECT ProductName, UnitPrice, UnitsInStock FROM Products WHERE UnitsInStock > 0 ORDER BY UnitPrice DESC',
    result: mockTables.Products.filter(p => p.UnitsInStock > 0).sort((a, b) => b.UnitPrice - a.UnitPrice)
  },
  {
    id: 11,
    name: 'All Products (Paginated)',
    category: 'Products',
    description: 'View all products - demonstrates pagination with 120+ records',
    query: 'SELECT * FROM Products ORDER BY ProductName',
    result: [...mockTables.Products].sort((a, b) => a.ProductName.localeCompare(b.ProductName))
  },
  {
    id: 12,
    name: 'Order Details (Paginated)',
    category: 'Analytics',
    description: 'View all order details - demonstrates pagination with 300+ records',
    query: 'SELECT * FROM OrderDetails ORDER BY OrderID, ProductID',
    result: [...mockTables.OrderDetails].sort((a, b) => {
      if (a.OrderID !== b.OrderID) return a.OrderID - b.OrderID;
      return a.ProductID - b.ProductID;
    })
  },
  {
    id: 6,
    name: 'Employee List',
    category: 'Employees',
    description: 'Get all employee names and titles',
    query: 'SELECT FirstName, LastName, Title FROM Employees',
    result: mockTables.Employees.map(e => ({
      FirstName: e.FirstName,
      LastName: e.LastName,
      Title: e.Title
    }))
  },
  {
    id: 7,
    name: 'Orders by Country',
    category: 'Analytics',
    description: 'Count orders grouped by shipping country',
    query: 'SELECT ShipCountry, COUNT(*) as OrderCount FROM Orders GROUP BY ShipCountry',
    result: Object.entries(
      mockTables.Orders.reduce((acc, order) => {
        acc[order.ShipCountry] = (acc[order.ShipCountry] || 0) + 1;
        return acc;
      }, {})
    ).map(([ShipCountry, OrderCount]) => ({ ShipCountry, OrderCount }))
  },
  {
    id: 8,
    name: 'Top Selling Products',
    category: 'Analytics',
    description: 'Products sorted by total quantity sold',
    query: 'SELECT p.ProductName, SUM(od.Quantity) as TotalSold FROM Products p JOIN OrderDetails od ON p.ProductID = od.ProductID GROUP BY p.ProductName ORDER BY TotalSold DESC LIMIT 10',
    result: Object.entries(
      mockTables.OrderDetails.reduce((acc, od) => {
        const product = mockTables.Products.find(p => p.ProductID === od.ProductID);
        if (product) {
          acc[product.ProductName] = (acc[product.ProductName] || 0) + od.Quantity;
        }
        return acc;
      }, {})
    )
      .map(([ProductName, TotalSold]) => ({ ProductName, TotalSold }))
      .sort((a, b) => b.TotalSold - a.TotalSold)
      .slice(0, 10)
  }
];

// Query matching function - normalizes and matches queries
export function matchQuery(query) {
  const normalized = query.trim().replace(/\s+/g, ' ').toLowerCase();

  // Try exact match first
  for (const predefined of predefinedQueries) {
    const predefinedNormalized = predefined.query.trim().replace(/\s+/g, ' ').toLowerCase();
    if (normalized === predefinedNormalized) {
      return predefined.result;
    }
  }

  // Try pattern matching for common variations
  for (const predefined of predefinedQueries) {
    const predefinedNormalized = predefined.query.trim().replace(/\s+/g, ' ').toLowerCase();
    // Remove LIMIT clauses for matching
    const queryNoLimit = normalized.replace(/\s+limit\s+\d+/gi, '');
    const predefinedNoLimit = predefinedNormalized.replace(/\s+limit\s+\d+/gi, '');

    if (queryNoLimit === predefinedNoLimit) {
      // If original query has LIMIT, apply it
      const limitMatch = normalized.match(/\s+limit\s+(\d+)/i);
      if (limitMatch) {
        const limit = parseInt(limitMatch[1]);
        return predefined.result.slice(0, limit);
      }
      return predefined.result;
    }
  }

  // Default: return empty result
  return [];
}

// Generate mock execution time
export function getMockExecutionTime() {
  return Math.floor(Math.random() * 450) + 50; // 50ms to 500ms
}
