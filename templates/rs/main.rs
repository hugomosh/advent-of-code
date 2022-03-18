use std::time::Instant;

pub fn main() {
    println!("Aoc Year: {{year}} Day: {{day}}");

/*     let input = String::from("bgvyzdsv");

    dbg!(&input);
    let mut t = Instant::now();
    let res2 = solve_part2(&input);
    dbg!(t.elapsed().as_millis());

    dbg!(&res2);
    t = Instant::now();
    let res = solve_part1(&input);
    dbg!(t.elapsed().as_millis());

    dbg!(&res);

    assert_eq!(solve_part1(&String::from("abcdef")), String::from("609043"));
    assert_eq!(
        solve_part1(&String::from("pqrstuv")),
        String::from("1048970")
    );

    assert_eq!(res, String::from("254575"));
    assert_eq!(res2, String::from("1038736")); */
}

pub fn solve_part1(input: &String) -> String {
    let mut i = 0;

    return i.to_string();
}

pub fn solve_part2(input: &String) -> String {
    let mut i = 0;

    return i.to_string();
}


#[test]
fn test_solve1() {
    let case1 = &r#"R5, L5, R5, R3"#.to_string();

    assert_eq!(
        solve_part1(),
        "12".to_string()
    );
}
#[test]
fn test_solve2() {
    let case2 = &r#"R8, R4, R4, R8"#.to_string();

    assert_eq!(
        solve_part2(&r#"R8, R4, R4, R8"#.to_string()),
        "4".to_string()
    );
}
