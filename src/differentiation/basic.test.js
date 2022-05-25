function cal(a,b){
    var rest = a*b;
    return rest;
}

test("test test",() => {
    const cal1 = cal(10,5);
    expect(cal1).toBe(50);
    console.log("successsssssssss")
})