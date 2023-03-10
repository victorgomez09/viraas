package sqlb

import (
	"fmt"
	"strings"

	"github.com/victorgomez09/viraas/internal/server"
)

type insertBuilder struct {
	table   string
	columns []string
	values  []string
	args    []any
	logger  server.Logger
}

func Insert(logger server.Logger, table string, record map[string]any) *insertBuilder {
	columns := []string{}
	values := []string{}
	args := []any{}
	i := 1
	for column, value := range record {
		columns = append(columns, `"`+column+`"`)
		args = append(args, value)
		values = append(values, fmt.Sprintf("$%d", i))
		i++
	}
	return &insertBuilder{
		table:   table,
		columns: columns,
		args:    args,
		values:  values,
		logger:  logger,
	}
}

func (b *insertBuilder) ToSQL() (sql string, args []any) {
	args = b.args
	columns := strings.Join(b.columns, ", ")
	values := strings.Join(b.values, ", ")
	sql = fmt.Sprintf(`INSERT INTO %s (%s) VALUES (%s)`, b.table, columns, values)
	b.logger.V("%s %v", sql, args)
	return sql, args
}
