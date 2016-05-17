Release History
---------------

## [Unreleased]
### Added
- Support for expanding rows

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




