export default class Database {
  private dbType: string;

  constructor(dbType: string) {
    this.dbType = dbType;
  }

  public connect() {
    console.log(`Connecting to ${this.dbType} database...`);
    // Connect to database
  }
}
