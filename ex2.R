require(RJSONIO)

returnResults <- function (jsonObj) {
    json <- fromJSON(jsonObj)
    # res <- c(1, 2, 3, 4)
    return(json)
}