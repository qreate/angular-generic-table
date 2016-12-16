Release History
---------------

## [Unreleased]
# [1.4.4] - 2016-12-16
- Fixed build error

### Fixed
- Improved chunk method used for pagination

# [1.4.3] - 2016-12-16

### Fixed
- Improved chunk method used for pagination

# [1.4.2] - 2016-09-06

### Fixed
- Error when exporting hidden columns to excel 

# [1.4.1] - 2016-08-30

### Fixed
- Null values in data were rendered as "null" in IE, now they're converted to empty string

# [1.4.0] - 2016-08-30
### Breaking changes
- Expand property in field settings is no longer used to define which directive to use when expanding/opening a row, just pass true if clicking column should expand row. Use gtExpand attribute to pass and object containing which directive to use and optionally, if multiple rows should be allowed, add that property as well like this:
`expandConfig:{
    directive:'<my-custom-directive></my-custom-directive>',
    multiple:true // false by default
 }`

### Added
- Support for responsive layout using stacked columns
- Support for custom sort function
- Support for only having one row expanded/opened at a time 

### Fixed
- Sorting of null vales

### Improved
- Removed some unnecessary two-way-bindings and watches
- Scopes created using $compile are now removed along with their watches (if any)

# [1.3.3] - 2016-08-19
### Fixed
- Compile error
- Sorting will now be reset unless ctrl-key or meta-key (mac) is pressed while sorting

### Added
- Excel export will by default escape unsafe methods, use new setting `exportEscapeString` to override
- Support for passing scope to compile function, can be used for two way binding of table data
- Support for custom search function, this function is used to set column value when searching the table

# [1.3.2] - 2016-08-05
### Fixed
- Minor markup error

# [1.3.1] - 2016-07-14
### Fixed
- Typo in bower package name and removed some unnecessary dependencies

# [1.3.0] - 2016-07-14
### Breaking changes
- Changed module name form 'generic.table' to 'angular.generic.table'. Source files have been changed to angular-generic-table.css and angular-generic-table.js.

# [1.2.1] - 2016-07-14
### Added
- Support for passing array with object keys i.e. columns to export function

### Fixed
- export settings and column order wasn't re-added to field definition when table structure was updated

# [1.2.0] - 2016-07-12
### Added
- Support for table search
- Support for table filters

# [1.1.1] - 2016-07-06
### Fixed
- Totals row used old filter

# [1.1.0] - 2016-07-05
### Added
- Support for expanding rows i.e. open/close rows
- Support for compiling fields
- Classes for even/odd rows

### Breaking changes
- Not really a breaking change, but the render function has been altered and now uses a directive. If your app uses sanitize for html content in the render function, you don't have to do so any more, in fact you'll probably have to remove it in order for the directive to work properly. I.e. remove `$sce.trustAsHtml('<div>...</div>')` from the render function.

# [1.0.9] - 2016-07-04
### Fixed
- Missing files due to commit error

# [1.0.8] - 2016-05-31
### Fixed
- Missing files due to commit error

# [1.0.7] - 2016-05-31
### Added
- Support for custom display function for export to CSV
- Table wrapper that can be used for table scroll

## [1.0.6] - 2016-05-25
### Added
- Support for reusing or forcing sorting when table structure is updated using `$scope.$broadcast('gt-update-structure:tableId', table);` where table should be an object containing 'settings' (array) and 'fields' (array) and optionally 'forceSorting' (boolean)

## [1.0.5] - 2016-05-24
### Added
- Support for adding class names to table element

### Fixed
- Initial sorting

## [1.0.4] - 2016-05-16
### Added
- Support for multiple tables within same controller

### Breaking changes
- Event listeners in generic-table have changed, to update table data, settings etc. you need to pass an unique id (gt-id) ie. `$scope.$broadcast('gt-update-table:tableId', data);`

## [1.0.3] - 2016-05-01
### Added
- Message when table has no data and option for custom text

## [1.0.2] - 2016-04-22
### Added
- Support for exporting table data to CSV

### Fixed
- Column sort click function

## [1.0.1] - 2016-04-20
### Added
- Support for custom click function for column

### Improved
- Mapping function

## 1.0.0 - 2016-04-19
### Added
- Support for pagination
- Support for sorting
- Custom render function
- Basic events




