pub fn main() {
    println!("Aoc Year: 2015 Day: 01");

    let s = std::fs::read_to_string("../input/2015/01.txt").unwrap();

    dbg!(&s[..40]);

    let res = solve_part1(&s);
    assert_eq!(solve_part1(&String::from(")())())")), -3);
    dbg!(res);
    assert_eq!(res, 232);

    let res2 = solve_part2(&s);
    assert_eq!(solve_part2(&String::from(")())())")), 1);
    dbg!(res2);
    assert_eq!(res2, 1783);
}

pub fn solve_part1(s: &String) -> i32 {
    // TODO: try with match
    let count_open_p: i32 = s
        .chars()
        .filter(|&x| x.eq(&'('))
        .count()
        .try_into()
        .unwrap();

    let count_close_p: i32 = s
        .chars()
        .filter(|&x| x.eq(&')'))
        .count()
        .try_into()
        .unwrap();

    count_open_p - count_close_p
}

pub fn solve_part2(s: &String) -> usize {
    let mut floor: i32 = 0;

    for (ii, c) in s.chars().enumerate() {
        floor += if c.eq(&'(') { 1 } else { -1 };
        if floor < 0 {
            return ii + 1;
        }
    }
    // TODO: return Err
    0
}
