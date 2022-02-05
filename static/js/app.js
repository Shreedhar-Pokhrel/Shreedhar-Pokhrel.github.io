var columns = ['stock symbol','closing price','amount','121d avg','180d avg','diff7+','52w low','52w high','sector','values','headings']
var table = d3.select('#base_table').append('table')
var thead = table.append('thead')
var tbody = table.append('tbody')

	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
	    .text((d) => d)

var tabulate = function (data,columns) {
  tbody.append('tr')
	  .selectAll('td')
	    .data(row => (columns.map(columns => data[columns])) )
	    .enter()
	  .append('td')
	    .text((d) => d)

}


d3.csv('../img/creation.csv',data=> {
  tabulate(data,columns);
  });

