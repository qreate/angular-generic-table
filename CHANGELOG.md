Release History
---------------

## [Unreleased]
### Added
- Support for expanding rows

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




