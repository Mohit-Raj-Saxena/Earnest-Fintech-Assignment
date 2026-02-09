export default function RootLayout({ children }: any) {
  return (
    <html>
      <body style={styles.body}>
        <header style={styles.header}>
          <h3 style={styles.logo}>Task Manager</h3>
        </header>
        <main style={styles.main}>{children}</main>
      </body>
    </html>
  )
}

const styles: any = {
  body: {
    margin: 0,
    fontFamily: "Inter, system-ui, Arial",
    background: "#f4f6f8"
  },
  header: {
    height: 56,
    background: "#111827",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "0 20px"
  },
  logo: {
    margin: 0,
    fontWeight: 500
  },
  main: {
    minHeight: "calc(100vh - 56px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}