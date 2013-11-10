require(RJSONIO)

getOptimalPortfolio <- function (jsonObj) {
    res <- c(1, 2, 3)

    return(toJSON(res))
}

# args <- '{"prods":["IBM","YHOO","MSFT"]}';
res <- getOptimalPortfolio(args)

# fromJSON(res)$pw

# Optimal weights: 0.27107,0.2688,0.46013