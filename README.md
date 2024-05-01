DECLARE
  v_sql VARCHAR2(4000);
  v_count NUMBER;
BEGIN
  FOR rec IN (SELECT owner, table_name, column_name FROM ALL_TAB_COLUMNS WHERE owner = 'YOUR_SCHEMA')
  LOOP
    v_sql := 'SELECT COUNT(*) FROM "' || rec.owner || '"."' || rec.table_name || 
             '" WHERE REGEXP_LIKE("' || rec.column_name || '", ''[^a-zA-Z0-9_]'' )';

    EXECUTE IMMEDIATE v_sql INTO v_count;

    IF v_count > 0 THEN
      DBMS_OUTPUT.PUT_LINE(rec.table_name || '.' || rec.column_name || ' contains special characters');
    END IF;
  END LOOP;
END;
