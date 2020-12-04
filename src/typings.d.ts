declare type ArrayElement<T> = T extends Array<infer U> ? U : unknown
