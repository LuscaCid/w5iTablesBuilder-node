export const TablesColumnsQuery = `
SELECT
    col.table_name AS nm_tabelacanvas,
    col.column_name AS nm_colunacanvas,
    col.data_type AS tp_colunacanvas,
    col.character_maximum_length AS nu_tamanho,
    col.column_default AS ds_valordefault,
    col.is_nullable = 'NO' AS is_notnull,   
    CASE 
        WHEN tc.constraint_type = 'UNIQUE' THEN true
        ELSE false
    END AS is_unique,                       
    CASE
        WHEN tc.constraint_type = 'PRIMARY KEY' THEN true
        ELSE false
    END AS is_primarykey,                  
    CASE
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN true
        ELSE false
    END AS is_foreignkey,                 
    fk.referenced_table_name AS referenced_table,
    fk.referenced_column_name AS referenced_column
FROM
    information_schema.columns col
LEFT JOIN 
    information_schema.key_column_usage kcu
    ON col.table_name = kcu.table_name 
    AND col.column_name = kcu.column_name 
    AND col.table_schema = kcu.table_schema
LEFT JOIN 
    information_schema.table_constraints tc
    ON kcu.constraint_name = tc.constraint_name 
    AND kcu.table_schema = tc.table_schema
LEFT JOIN 
    (
        SELECT 
            tc.constraint_name,
            kcu.table_name,
            kcu.column_name,
            ccu.table_name AS referenced_table_name,
            ccu.column_name AS referenced_column_name
        FROM 
            information_schema.table_constraints tc
        JOIN 
            information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
        JOIN 
            information_schema.constraint_column_usage ccu
            ON ccu.constraint_name = tc.constraint_name
        WHERE 
            tc.constraint_type = 'FOREIGN KEY'
    ) fk
    ON kcu.constraint_name = fk.constraint_name
WHERE
    col.table_schema = 'public'
ORDER BY
    col.table_name, col.ordinal_position;`;

export const TablesRelationsQuery = `SELECT
tc.table_name AS foreign_table,                
kcu.column_name AS foreign_column,             
ccu.table_name AS referenced_table,            
ccu.column_name AS referenced_column           
FROM
information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE
constraint_type = 'FOREIGN KEY'
AND tc.table_schema = 'public'
ORDER BY
foreign_table, foreign_column;

`;
