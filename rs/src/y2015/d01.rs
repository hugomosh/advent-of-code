pub fn problem1() {
    println!("Aoc Year: 2015 Day: 01");

    let s = std::fs::read_to_string("../input/2015/01.txt").unwrap();

    dbg!(&s[..40]);

    let res = solve_part1(&s);
    assert_eq!(solve_part1(&String::from(")())())")), -3);
    dbg!(res);

    let res2 = solve_part2(&s);
    assert_eq!(solve_part2(&String::from(")())())")), 1);
    dbg!(res2);
}

pub fn solve_part1(s: &String) -> isize {
    let count_open_p: isize = s.chars().filter(|x| x.eq(&'(')).count().try_into().unwrap();
    let count_close_p: isize = s.chars().filter(|x| x.eq(&')')).count().try_into().unwrap();

    count_open_p - count_close_p
}

pub fn solve_part2(s: &String) -> usize {
    let mut floor: isize = 0;
    let mut i: usize = 0;

    while floor >= 0 && i < s.len() {
        floor += if s.chars().nth(i).unwrap().eq(&'(') {
            1
        } else {
            -1
        };
        i += 1;
    }

    return i;
}
