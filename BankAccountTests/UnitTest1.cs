using BankAccountNS;

namespace BankTests;

[TestClass]
public class BankAccountTests
{
    [TestMethod]
    public void Succesfully_Add_Transaction()
    {
        BankAccount testAccount = new BankAccount("BigSpender");
        string jsonExample = """[{"Id":"1","Date":"2024-01-01T10:30:00","Value":10000,"Type":"Credit"}]""";

        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");

        Assert.AreEqual(jsonExample, testAccount.WriteTransactionsJson());
    }

    [TestMethod]
    public void Print_Formatted_Statement()
    {
        BankAccount testAccount = new BankAccount("BigSpender");
        string formattedText = "date       || credit  || debit  || balance";
        formattedText += "\n01/01/2024 || £100.00 ||         || £100.00";
        formattedText += "\n02/01/2024 || £150.00 ||         || £250.00";
        formattedText += "\n03/01/2024 || £250.00 ||         || £500.00";
        formattedText += "\n04/01/2024 ||         || £200.00 || £300.00";
        formattedText += "\n05/01/2024 ||         || £300.00 || £0.00";


        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");
        testAccount.AddTransaction("2", new DateTime(2024, 1, 2, 9, 15, 0), 15000, "Credit");
        testAccount.AddTransaction("3", new DateTime(2024, 1, 3, 12, 0, 0), 25000, "Credit");
        testAccount.AddTransaction("4", new DateTime(2024, 1, 4, 14, 45, 0), 20000, "Debit");
        testAccount.AddTransaction("5", new DateTime(2024, 1, 5, 16, 0, 0), 30000, "Debit");


        Assert.AreEqual(formattedText, testAccount.PrintStatement());
    }

    [TestMethod]
    public void Calculate_Balance_Correctly()
    {
        BankAccount testAccount = new BankAccount("BigSpender");
        string expectedBalance = "£0.00";


        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");
        testAccount.AddTransaction("2", new DateTime(2024, 1, 2, 9, 15, 0), 15000, "Credit");
        testAccount.AddTransaction("3", new DateTime(2024, 1, 3, 12, 0, 0), 25000, "Credit");
        testAccount.AddTransaction("4", new DateTime(2024, 1, 4, 14, 45, 0), 20000, "Debit");
        testAccount.AddTransaction("5", new DateTime(2024, 1, 5, 16, 0, 0), 30000, "Debit");


        Assert.AreEqual(expectedBalance, testAccount.OutputBalance());
    }

    [TestMethod]
    public void Throws_Exception_When_Cannot_Withdraw()
    {
        BankAccount testAccount = new BankAccount("BigSpender");


        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");
        testAccount.AddTransaction("2", new DateTime(2024, 1, 2, 9, 15, 0), 15000, "Credit");
        testAccount.AddTransaction("3", new DateTime(2024, 1, 3, 12, 0, 0), 25000, "Credit");
        testAccount.AddTransaction("4", new DateTime(2024, 1, 4, 14, 45, 0), 20000, "Debit");
        testAccount.AddTransaction("5", new DateTime(2024, 1, 5, 16, 0, 0), 30000, "Debit");

        var exception = Assert.ThrowsException<Exception>(() =>
                testAccount.AddTransaction("6", new DateTime(2024, 1, 5, 16, 0, 0), 30000, "Debit"));

        Assert.AreEqual("Insufficent funds" , exception.Message);
    }

    [TestMethod]
    public void Returns_Only_Selected_Dates()
    {
        BankAccount testAccount = new BankAccount("BigSpender");
        string formattedText = "date       || credit  || debit  || balance";
        formattedText += "\n01/01/2024 || £100.00 ||         || £100.00";
        formattedText += "\n02/01/2024 || £150.00 ||         || £250.00";
        formattedText += "\n03/01/2024 || £250.00 ||         || £500.00";


        testAccount.AddTransaction("1", new DateTime(2024, 1, 1, 10, 30, 0), 10000, "Credit");
        testAccount.AddTransaction("2", new DateTime(2024, 1, 2, 9, 15, 0), 15000, "Credit");
        testAccount.AddTransaction("3", new DateTime(2024, 1, 3, 12, 0, 0), 25000, "Credit");
        testAccount.AddTransaction("4", new DateTime(2024, 1, 4, 14, 45, 0), 20000, "Debit");
        testAccount.AddTransaction("5", new DateTime(2024, 1, 5, 16, 0, 0), 30000, "Debit");


        Assert.AreEqual(formattedText, testAccount.PrintSelectedDates(new DateTime(2024, 1, 1), new DateTime(2024, 1, 4)));
    }
}