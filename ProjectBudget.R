require(RJSONIO)
# rm(list=ls())
# require(ULF, rjson)

#'  Function to project balance

getOptimalPortfolio <- function (jsonObj) {
    res <- c(1, 2, 3)
    return(toJSON(res))
    # stmt <-  jsonObj
    # ob1<- as.data.frame(t(as.matrix(unlist(stmt[1]))), stringsAsFactors=FALSE)
    # ob2<- as.data.frame(t(as.matrix(unlist(stmt[2]))), stringsAsFactors=FALSE)
    # obs<- rbind(ob1, ob2)
    # for(i in 3:length(stmt)) {  #This is a horrible way to do this..
    #   #print(i)
    #   thisOb<- as.data.frame(t(as.matrix(unlist(stmt[i]))), stringsAsFactors=FALSE)
    #   thisOb<- subset(thisOb, select=names(obs))
    #   obs<-rbind(obs,thisOb)
    # }

    # stmt<-obs
    # stmt$amount<- as.numeric(stmt$amount)
    # currentBalance<- as.numeric(stmt$currentBalance)
    # stmt<-subset(stmt,!is.na(amount))
    # stmt$date<-as.Date(substr(stmt$postDate,start=0,stop=10), format="%Y-%m-%d")
    # stmt$amount[stmt$transactionBaseType=="debit"] <- -stmt$amount[stmt$transactionBaseType=="debit"]
    # stmt$mday<- as.POSIXlt(stmt$date)$mday

    # # Estimate Inflow Function ------------------------------------------------
    # stmt$amountW<- deOutlier(stmt$amount) # Removes extreme observations of cashflows.
    # # plot(amountW~amount, data=stmt)

    # # inflowItems<-subset(stmt, amountW>0)
    # # outflows<- aggregate(amountW ~ dom, data=subset(stmt, amount<0) , sum)
    # # plot(amountW ~ dom, data=outflows, las=1,type="h", main="Outflows by DOM")
    #  netCashFlows<- aggregate(amountW ~ date, data=stmt , sum)
    #  netCashFlows$mday<- as.POSIXlt(netCashFlows$date)$mday

    # #EODBalances<- cumsum(c(currentBalance, netCashFlows$amountW))[-1]
    # # head(EODBalances)
    # # plot(EODBalances ~ netCashFlows$date, type="s")

    # # Formula projecing net cashflows on a given day.
    # netCashFlows$mday<-as.factor(netCashFlows$mday)
    # lm1<-lm(amountW ~ mday, data=netCashFlows )

    # #summary(lm1)
    # #table(netCashFlows$mday)

    # output<- data.frame(projectedCashFlows=predict(lm1, newdata=data.frame(mday=rep(levels(as.factor(netCashFlows$mday)),12))))

    # output$projectedBalances<- cumsum(c(currentBalance[1], output$projectedCashFlows))[-1]
    # output$date <-
    #   rep(sort(as.numeric(as.character(levels(netCashFlows$mday)))),12) +
    #   rep(seq(0,11*30,30),each=nlevels(netCashFlows$mday))

    # # head(output)
    # # plot(projectedBalances~date,data=output,type="h", las=1,col="dark green")
    # return(toJSON(subset(output,select=c(date,projectedCashFlows, projectedBalances))))
}