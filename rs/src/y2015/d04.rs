use std::{fmt::format, ops::Add};

use md5;

pub fn main() {
    println!("Aoc Year: 2015 Day: 04");

    let input = String::from("bgvyzdsv");

    dbg!(&input[..5]);

    let res2 = solve_part2(&input);
    dbg!(res2);

    let res = solve_part1(&input);
    dbg!(&res);

    let digest2 = md5::compute(b"abcdef609043");
    dbg!(digest2);
    dbg!(format!("{:x}", digest2).starts_with("00000"));

    assert_eq!(solve_part1(&String::from("abcdef")), String::from("609043"));
    assert_eq!(
        solve_part1(&String::from("pqrstuv")),
        String::from("1048970")
    );

    assert_eq!(res, String::from("254575"));

    /*
    assert_eq!(res, 2639);
    assert_eq!(solve_part2(&String::from("^v")), 3);
    assert_eq!(solve_part2(&String::from("^>v<")), 3);
    assert_eq!(solve_part2(&String::from("^v^v^v^v^v")), 11); */
}

pub fn solve_part1(input: &String) -> String {
    let mut i = 0;
    let mut digest = md5::compute(input.clone().add(&i.to_string()));

    while !format!("{:x}", digest).starts_with("00000") {
        i += 1;
        digest = md5::compute(input.clone().add(&i.to_string()));
    }
    dbg!(digest);

    return i.to_string();
}

pub fn solve_part2(input: &String) -> String {
    let mut i = 0;
    let mut digest = md5::compute(input.clone().add(&i.to_string()));

    while !format!("{:x}", digest).starts_with("000000") {
        i += 1;
        digest = md5::compute(input.clone().add(&i.to_string()));
    }
    dbg!(digest);

    return i.to_string();
}
