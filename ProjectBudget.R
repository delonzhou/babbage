
library(ULF)
#'  Function to project balance
#input <-  "~/Documents/babbage/data/data.json"
 #stmt<- fromJSON(input, asText=FALSE)

returnResults<- function(input) {
  stmt<- fromJSON(input) 

#stmt <-  fromJSON(file=input)
ob1<- as.data.frame(t(as.matrix(unlist(stmt[1]))), stringsAsFactors=FALSE)
ob2<- as.data.frame(t(as.matrix(unlist(stmt[2]))), stringsAsFactors=FALSE)
obs<- rbind(ob1, ob2)
for(i in 3:length(stmt)) {  #This is a horrible way to do this.. 
  #print(i)
  thisOb<- as.data.frame(t(as.matrix(unlist(stmt[i]))), stringsAsFactors=FALSE)
  thisOb<- subset(thisOb, select=names(obs))
  obs<-rbind(obs,thisOb)
}

stmt<-obs
stmt$amount<- as.numeric(stmt$amount)
currentBalance<- as.numeric(stmt$currentBalance)
stmt<-subset(stmt,!is.na(amount))
stmt$date<-as.Date(substr(stmt$postDate,start=0,stop=10), format="%Y-%m-%d")
stmt$amount[stmt$transactionBaseType=="debit"] <- -stmt$amount[stmt$transactionBaseType=="debit"]
stmt$mday<- as.POSIXlt(stmt$date)$mday

# Estimate Inflow Function ------------------------------------------------
stmt$amountW<- deOutlier(stmt$amount) # Removes extreme observations of cashflows. 
# plot(amountW~amount, data=stmt)
 
# inflowItems<-subset(stmt, amountW>0)
# outflows<- aggregate(amountW ~ dom, data=subset(stmt, amount<0) , sum)
# plot(amountW ~ dom, data=outflows, las=1,type="h", main="Outflows by DOM")
 netCashFlows<- aggregate(amountW ~ date, data=stmt , sum)
 netCashFlows$mday<- as.POSIXlt(netCashFlows$date)$mday
 netCashFlows$mday<- as.numeric(netCashFlows$mday) 
 missingdays<-setdiff(seq(1,30), unique(netCashFlows$mday))
 
# Add in 'fake' historical days so that there are coefficients for every month-day. 
for (i in 1:length(missingdays)) {
  netCashFlows<- rbind(netCashFlows,
                       data.frame(date=Sys.Date(),
                                  amountW=0,
                                  mday=missingdays[i]))
} 
# Formula projecing net cashflows on a given day. 
netCashFlows$mday<-as.factor(netCashFlows$mday)
#levels(netCashFlows$mday)
lm1<-lm(amountW ~ mday, data=netCashFlows )

#summary(lm1)
#table(netCashFlows$mday)
# Make the predicted data start on the next date
startMday<- as.numeric(as.POSIXlt(Sys.Date())$mday)
repObj<-  c(seq(startMday,31), seq(1,(startMday-1)))


output<- data.frame(mday=as.factor(rep(repObj,12)))
output$projectedCashFlows<- predict(lm1, newdata=output)
#plot(projectedCashFlows ~ mday, data=output)

output$projectedBalances<- cumsum(c(currentBalance[1], output$projectedCashFlows))[-1]

output$date <-   rep(sort(as.numeric(as.character(levels(netCashFlows$mday)))),12) +
  rep(seq(0,11*30,30),each=nlevels(netCashFlows$mday))
  
#plot(projectedBalances~date,data=output,type="h", las=1,col="dark green")

  return(toJSON(subset(output,select=c(date,projectedCashFlows, projectedBalances))))
}
 


